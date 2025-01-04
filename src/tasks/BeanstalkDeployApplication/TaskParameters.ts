/*!
 * Copyright 2019 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 * SPDX-License-Identifier: MIT
 */

import * as tl from 'azure-pipelines-task-lib/task'

import { AWSConnectionParameters, buildConnectionParameters } from 'lib/awsConnectionParameters'
import { TaskInput, typedLoc } from 'lib/vstsUtils'
import { BeanstalkDeployApplicationInput, BeanstalkDeployApplicationMessages } from './types.gen'

export const defaultEventPollingDelaySeconds = 5
export const maxEventPollingDelaySeconds = 300

export interface TaskParameters {
    awsConnectionParameters: AWSConnectionParameters
    applicationName: string
    environmentName: string
    applicationType: BeanstalkDeployApplicationInput['applicationType']
    versionLabel: string
    webDeploymentArchive: string
    dotnetPublishPath: string
    deploymentBundleBucket: string
    deploymentBundleKey: string
    description: string
    outputVariable: string
    eventPollingDelay: number
}

export function buildTaskParameters(): TaskParameters {
    const taskInput = new TaskInput<BeanstalkDeployApplicationInput>()
    const parameters: TaskParameters = {
        awsConnectionParameters: buildConnectionParameters(),
        applicationName: taskInput.getInputRequired('applicationName'),
        environmentName: taskInput.getInputRequired('environmentName'),
        applicationType: taskInput.getInputRequired('applicationType'),
        versionLabel: '',
        webDeploymentArchive: '',
        dotnetPublishPath: '',
        deploymentBundleBucket: '',
        deploymentBundleKey: '',
        description: taskInput.getInputOrEmpty('description'),
        outputVariable: taskInput.getInputOrEmpty('outputVariable'),
        eventPollingDelay: defaultEventPollingDelaySeconds
    }

    console.log(tl.loc('DisplayApplicationType', parameters.applicationType))

    switch (parameters.applicationType) {
        case 'aspnet':
            parameters.webDeploymentArchive = taskInput.getPathInputRequired('webDeploymentArchive')
            break
        case 'aspnetCoreWindows':
        case 'aspnetCoreLinux':
            parameters.dotnetPublishPath = taskInput.getPathInputRequired('dotnetPublishPath')
            break
        case 's3':
            parameters.deploymentBundleBucket = taskInput.getInputRequired('deploymentBundleBucket')
            parameters.deploymentBundleKey = taskInput.getInputRequired('deploymentBundleKey')
            break
        case 'version':
            parameters.versionLabel = taskInput.getInputRequired('versionLabel')
            break
        default:
            parameters.versionLabel = taskInput.getInputOrEmpty('versionLabel')
            break
    }

    const pollDelay = taskInput.getInputOptional('eventPollingDelay')
    if (pollDelay) {
        const pollDelayValue = parseInt(pollDelay, 10)
        if (
            isNaN(pollDelayValue) ||
            pollDelayValue < defaultEventPollingDelaySeconds ||
            pollDelayValue > maxEventPollingDelaySeconds
        ) {
            console.log(
                typedLoc<BeanstalkDeployApplicationMessages>('InvalidEventPollDelay', pollDelay, defaultEventPollingDelaySeconds, maxEventPollingDelaySeconds)
            )
        } else {
            parameters.eventPollingDelay = pollDelayValue
        }
    }

    return parameters
}
