/*!
 * Copyright 2019 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 * SPDX-License-Identifier: MIT
 */

import { AWSConnectionParameters, buildConnectionParameters } from 'lib/awsConnectionParameters'
import { TaskInput } from 'lib/vstsUtils'
import { AWSCLIInput } from './types.gen'

export interface TaskParameters {
    awsConnectionParameters: AWSConnectionParameters
    awsCliCommand: string
    awsCliSubCommand: string
    awsCliParameters: string
    failOnStandardError: boolean
}

export function buildTaskParameters(): TaskParameters {
    const taskInput = new TaskInput<AWSCLIInput>()
    const parameters: TaskParameters = {
        awsConnectionParameters: buildConnectionParameters(),
        awsCliCommand: taskInput.getInputRequired('awsCommand'),
        awsCliSubCommand: taskInput.getInputRequired('awsSubCommand'),
        awsCliParameters: taskInput.getInputOrEmpty('awsArguments'),
        failOnStandardError: taskInput.getBoolInputOptional('failOnStandardError')
    }

    return parameters
}
