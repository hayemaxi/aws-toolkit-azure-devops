/*!
 * Copyright 2019 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 * SPDX-License-Identifier: MIT
 */

import {
    SecretsManager,
    Tag,
    CreateSecretCommandInput,
    PutSecretValueCommandInput,
    UpdateSecretCommandInput
} from '@aws-sdk/client-secrets-manager'
import tl = require('azure-pipelines-task-lib/task')
import { SdkUtils } from 'lib/sdkutils'
import fs = require('fs')
import { binarySecretType, inlineSecretSource, stringSecretType, TaskParameters } from './TaskParameters'

export class TaskOperations {
    public constructor(
        public readonly secretsManagerClient: SecretsManager,
        public readonly taskParameters: TaskParameters
    ) {}

    public async execute(): Promise<void> {
        try {
            await this.updateSecret()
            console.log(tl.loc('UpdateSecretCompleted'))
        } catch (err) {
            if (err !== undefined && err.code === 'ResourceNotFoundException') {
                if (this.taskParameters.autoCreateSecret) {
                    await this.createSecret()
                    console.log(tl.loc('CreateSecretCompleted'))
                } else {
                    throw new Error(tl.loc('SecretNotFound'))
                }
            } else {
                throw new Error(tl.loc('SecretUpdateFailed', err))
            }
        }
    }

    private async updateSecret(): Promise<void> {
        console.log(tl.loc('UpdatingSecret', this.taskParameters.secretNameOrId))

        // treat updating descrption et al about the secret as distinct from a value update
        if (this.taskParameters.description || this.taskParameters.kmsKeyId) {
            const updateMetaRequest: UpdateSecretCommandInput = {
                SecretId: this.taskParameters.secretNameOrId
            }

            if (this.taskParameters.description) {
                updateMetaRequest.Description = this.taskParameters.description
            }
            if (this.taskParameters.kmsKeyId) {
                updateMetaRequest.KmsKeyId = this.taskParameters.kmsKeyId
            }

            await this.secretsManagerClient.updateSecret(updateMetaRequest)
        }

        const updateValueRequest: PutSecretValueCommandInput = {
            SecretId: this.taskParameters.secretNameOrId
        }

        if (this.taskParameters.secretValueSource === inlineSecretSource) {
            updateValueRequest.SecretString = this.taskParameters.secretValue
        } else {
            switch (this.taskParameters.secretValueType) {
                case stringSecretType: {
                    updateValueRequest.SecretString = fs.readFileSync(this.taskParameters.secretValueFile, 'utf8')
                    break
                }

                case binarySecretType: {
                    updateValueRequest.SecretBinary = fs.readFileSync(this.taskParameters.secretValueFile)
                    break
                }
            }
        }

        const response = await this.secretsManagerClient.putSecretValue(updateValueRequest)

        if (this.taskParameters.arnOutputVariable) {
            console.log(tl.loc('SettingArnOutputVariable', this.taskParameters.arnOutputVariable))
            tl.setVariable(this.taskParameters.arnOutputVariable, `${response.ARN}`)
        }

        if (this.taskParameters.versionIdOutputVariable) {
            console.log(tl.loc('SettingVersionIdOutputVariable', this.taskParameters.versionIdOutputVariable))
            tl.setVariable(this.taskParameters.versionIdOutputVariable, `${response.VersionId}`)
        }
    }

    private async createSecret(): Promise<void> {
        console.log(tl.loc('SecretNotFoundAutoCreating'))

        const request: CreateSecretCommandInput = {
            Name: this.taskParameters.secretNameOrId,
            KmsKeyId: this.taskParameters.kmsKeyId
        }

        if (this.taskParameters.description) {
            request.Description = this.taskParameters.description
        }
        if (this.taskParameters.secretValueSource === inlineSecretSource) {
            request.SecretString = this.taskParameters.secretValue
        } else {
            switch (this.taskParameters.secretValueType) {
                case stringSecretType:
                    request.SecretString = fs.readFileSync(this.taskParameters.secretValueFile, 'utf8')
                    break

                case binarySecretType:
                    request.SecretBinary = fs.readFileSync(this.taskParameters.secretValueFile)
                    break
            }
        }

        if (this.taskParameters.tags && this.taskParameters.tags.length > 0) {
            request.Tags = SdkUtils.getTags<Tag[]>(this.taskParameters.tags)
        }

        const response = await this.secretsManagerClient.createSecret(request)

        if (this.taskParameters.arnOutputVariable) {
            console.log(tl.loc('SettingArnOutputVariable', this.taskParameters.arnOutputVariable))
            tl.setVariable(this.taskParameters.arnOutputVariable, `${response.ARN}`)
        }

        if (this.taskParameters.versionIdOutputVariable) {
            console.log(tl.loc('SettingVersionIdOutputVariable', this.taskParameters.versionIdOutputVariable))
            tl.setVariable(this.taskParameters.versionIdOutputVariable, `${response.VersionId}`)
        }
    }
}
