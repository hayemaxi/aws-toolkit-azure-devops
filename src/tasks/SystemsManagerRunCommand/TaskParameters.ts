/*!
 * Copyright 2019 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 * SPDX-License-Identifier: MIT
 */

import * as tl from 'azure-pipelines-task-lib/task'
import { AWSConnectionParameters, buildConnectionParameters } from 'lib/awsConnectionParameters'
import { getInputOptional, getInputOrEmpty, getInputRequired } from 'lib/vstsUtils'

export const fromInstanceIds = 'fromInstanceIds'
export const fromTags = 'fromTags'
export const fromBuildVariable = 'fromBuildVariable'

import taskJson from './task.json';
import { notificationEventsInput, notificationTypeInput } from './inputTypes.gen'
const taskJsonConst = {
    ...taskJson
} as const;

const inputsConst = [...taskJson.inputs] as const

export interface TaskParameters {
    awsConnectionParameters: AWSConnectionParameters
    documentName: string
    documentParameters: string
    serviceRoleARN: string
    comment: string
    instanceSelector: string
    instanceIds: string[]
    instanceTags: string[]
    instanceBuildVariable: string
    maxConcurrency: string
    maxErrors: string
    timeout: string
    notificationArn: string | undefined
    notificationEvents: notificationEventsInput | undefined
    notificationType: notificationTypeInput | undefined
    outputS3BucketName: string
    outputS3KeyPrefix: string
    cloudWatchOutputEnabled: boolean;
    cloudWatchLogGroupName: string;
    commandIdOutputVariable: string
}

export function buildTaskParameters(): TaskParameters {
    const parameters: TaskParameters = {
        awsConnectionParameters: buildConnectionParameters(),
        documentName: getInputRequired('documentName'),
        documentParameters: getInputOrEmpty('documentParameters'),
        serviceRoleARN: getInputOrEmpty('serviceRoleARN'),
        comment: getInputOrEmpty('comment'),
        instanceSelector: getInputRequired('instanceSelector'),
        maxConcurrency: getInputOrEmpty('maxConcurrency'),
        maxErrors: getInputOrEmpty('maxErrors'),
        timeout: getInputOrEmpty('timeout'),
        notificationArn: getInputOptional('notificationArn'),
        notificationEvents: getInputOptional('notificationEvents') as notificationEventsInput,
        notificationType: getInputOptional('notificationType') as notificationTypeInput,
        outputS3BucketName: getInputOrEmpty('outputS3BucketName'),
        outputS3KeyPrefix: getInputOrEmpty('outputS3KeyPrefix'),
        cloudWatchOutputEnabled: tl.getBoolInput('cloudWatchOutputEnabled'),
        cloudWatchLogGroupName: getInputOrEmpty('cloudWatchLogGroupName'),
        commandIdOutputVariable: getInputOrEmpty('commandIdOutputVariable'),
        instanceIds: [],
        instanceTags: [],
        instanceBuildVariable: ''
    }

    switch (parameters.instanceSelector) {
        case fromInstanceIds:
            parameters.instanceIds = tl.getDelimitedInput('instanceIds', '\n', true)
            break

        case fromTags:
            parameters.instanceTags = tl.getDelimitedInput('instanceTags', '\n', true)
            break

        case fromBuildVariable:
            parameters.instanceBuildVariable = getInputRequired('instanceBuildVariable')
            break

        default:
            throw new Error(`Unknown value for instances selection: ${parameters.instanceSelector}`)
    }

    return parameters
}
