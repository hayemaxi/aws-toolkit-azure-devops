/*!
 * Copyright 2019 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 * SPDX-License-Identifier: MIT
 */

import { ElasticBeanstalk, CreateApplicationVersionCommandInput, S3Location } from '@aws-sdk/client-elastic-beanstalk'
import { S3 } from '@aws-sdk/client-s3'
import * as tl from 'azure-pipelines-task-lib/task'
import { BeanstalkUtils } from 'lib/beanstalkUtils'
import { SdkUtils } from 'lib/sdkutils'
import path = require('path')
import { TaskParameters } from './TaskParameters'

export class TaskOperations {
    public constructor(
        public readonly beanstalkClient: ElasticBeanstalk,
        public readonly s3Client: S3,
        public readonly taskParameters: TaskParameters
    ) {}

    public async execute(): Promise<void> {
        await BeanstalkUtils.verifyApplicationExists(this.beanstalkClient, this.taskParameters.applicationName)

        const versionLabel = BeanstalkUtils.constructVersionLabel(this.taskParameters.versionLabel)

        let s3Bucket: string
        let s3Key: string

        if (this.taskParameters.applicationType !== 's3') {
            s3Bucket = await BeanstalkUtils.determineS3Bucket(this.beanstalkClient)
            let deploymentBundle: string
            if (this.taskParameters.applicationType === 'aspnetCoreWindows') {
                const tempDirectory = SdkUtils.getTempLocation()
                deploymentBundle = await BeanstalkUtils.prepareAspNetCoreBundleWindows(
                    this.taskParameters.dotnetPublishPath,
                    tempDirectory
                )
            } else if (this.taskParameters.applicationType === 'aspnetCoreLinux') {
                const tempDirectory = SdkUtils.getTempLocation()
                deploymentBundle = await BeanstalkUtils.prepareAspNetCoreBundleLinux(
                    this.taskParameters.dotnetPublishPath,
                    tempDirectory
                )
            } else {
                deploymentBundle = this.taskParameters.webDeploymentArchive
            }

            s3Key = `${this.taskParameters.applicationName}/${path.basename(
                deploymentBundle,
                '.zip'
            )}-${versionLabel}.zip`
            await BeanstalkUtils.uploadBundle(this.s3Client, deploymentBundle, s3Bucket, s3Key)
        } else {
            s3Bucket = this.taskParameters.deploymentBundleBucket
            s3Key = this.taskParameters.deploymentBundleKey
        }

        const sourceBundle: S3Location = {
            S3Bucket: s3Bucket,
            S3Key: s3Key
        }

        const versionRequest: CreateApplicationVersionCommandInput = {
            ApplicationName: this.taskParameters.applicationName,
            VersionLabel: versionLabel,
            SourceBundle: sourceBundle
        }
        if (this.taskParameters.description) {
            versionRequest.Description = this.taskParameters.description
        }

        await this.beanstalkClient.createApplicationVersion(versionRequest)

        if (this.taskParameters.description) {
            console.log(
                tl.loc(
                    'CreatedApplicationVersionWithDescription',
                    versionRequest.VersionLabel,
                    this.taskParameters.description,
                    this.taskParameters.applicationName
                )
            )
        } else {
            console.log(
                tl.loc('CreatedApplicationVersion', versionRequest.VersionLabel, this.taskParameters.applicationName)
            )
        }

        if (this.taskParameters.outputVariable) {
            console.log(tl.loc('SettingOutputVariable', this.taskParameters.outputVariable, versionLabel))
            tl.setVariable(this.taskParameters.outputVariable, versionLabel)
        }

        console.log(tl.loc('TaskCompleted'))
    }
}
