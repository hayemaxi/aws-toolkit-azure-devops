/*!
 * Copyright 2019 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 * SPDX-License-Identifier: MIT
 */

import { AWSConnectionParameters, buildConnectionParameters } from 'lib/awsConnectionParameters'
import { TaskInput } from 'lib/vstsUtils'
import { BeanstalkCreateApplicationVersionInput } from './types.gen'

export interface TaskParameters {
    awsConnectionParameters: AWSConnectionParameters
    applicationName: string
    applicationType: BeanstalkCreateApplicationVersionInput['applicationType']
    webDeploymentArchive: string
    dotnetPublishPath: string
    deploymentBundleBucket: string
    deploymentBundleKey: string
    versionLabel: string
    description: string
    outputVariable: string
}

export function buildTaskParameters(): TaskParameters {
    const taskInput = new TaskInput<BeanstalkCreateApplicationVersionInput>()
    const parameters: TaskParameters = {
        awsConnectionParameters: buildConnectionParameters(),
        applicationName: taskInput.getInputRequired('applicationName'),
        applicationType: taskInput.getInputRequired('applicationType'),
        webDeploymentArchive: '',
        dotnetPublishPath: '',
        deploymentBundleBucket: '',
        deploymentBundleKey: '',
        versionLabel: taskInput.getInputOrEmpty('versionLabel'),
        description: taskInput.getInputOrEmpty('description'),
        outputVariable: taskInput.getInputOrEmpty('outputVariable')
    }

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
    }

    return parameters
}
