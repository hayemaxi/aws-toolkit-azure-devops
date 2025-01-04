/*!
 * Copyright 2019 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 * SPDX-License-Identifier: MIT
 */



import AWS_client_cloudformation = require('@aws-sdk/client-cloudformation');
import waitUntilStackDeleteComplete = AWS_client_cloudformation.waitUntilStackDeleteComplete;
import CloudFormation = AWS_client_cloudformation.CloudFormation;
import * as tl from 'azure-pipelines-task-lib/task'
import { TaskParameters } from './TaskParameters'

export class TaskOperations {
    public constructor(
        public readonly cloudFormationClient: CloudFormation,
        public readonly taskParameters: TaskParameters
    ) {}

    public async execute(): Promise<void> {
        await this.verifyResourcesExist(this.taskParameters.stackName)

        console.log(tl.loc('RequestingStackDeletion', this.taskParameters.stackName))
        await this.cloudFormationClient
            .deleteStack({
                StackName: this.taskParameters.stackName
            })
        await this.waitForStackDeletion(this.taskParameters.stackName)

        console.log(tl.loc('TaskCompleted'))
    }

    private async verifyResourcesExist(stackName: string): Promise<void> {
        try {
            await this.cloudFormationClient.describeStacks({ StackName: stackName })
        } catch (err) {
            throw new Error(tl.loc('StackDoesNotExist', stackName))
        }
    }

    private async waitForStackDeletion(stackName: string): Promise<void> {
        console.log(tl.loc('WaitingForStackDeletion', stackName))
        try {
            await waitUntilStackDeleteComplete({
                client: this.cloudFormationClient,
                maxWaitTime: 200
            }, { StackName: stackName })
            console.log(tl.loc('StackDeleted'))
        } catch (err) {
            throw new Error(tl.loc('StackDeletionFailed', stackName, (err as Error).message))
        }
    }
}
