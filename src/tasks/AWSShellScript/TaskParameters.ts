/*!
 * Copyright 2019 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 * SPDX-License-Identifier: MIT
 */

import { AWSConnectionParameters, buildConnectionParameters } from 'lib/awsConnectionParameters'
import { TaskInput } from 'lib/vstsUtils'
import { AWSShellScriptInput } from './types.gen'

export interface TaskParameters {
    awsConnectionParameters: AWSConnectionParameters
    arguments: string
    scriptType: AWSShellScriptInput['scriptType']
    filePath: string
    inlineScript: string
    disableAutoCwd: boolean
    workingDirectory: string
    failOnStandardError: boolean
}

export function buildTaskParameters(): TaskParameters {
    const taskInput = new TaskInput<AWSShellScriptInput>()
    const parameters: TaskParameters = {
        awsConnectionParameters: buildConnectionParameters(),
        arguments: taskInput.getInputOrEmpty('arguments'),
        scriptType: taskInput.getInputRequired('scriptType'),
        filePath: '',
        inlineScript: '',
        disableAutoCwd: taskInput.getBoolInputOptional('disableAutoCwd'),
        workingDirectory: '',
        failOnStandardError: taskInput.getBoolInputOptional('failOnStandardError')
    }

    if (parameters.scriptType === 'filePath') {
        parameters.filePath = taskInput.getPathInputRequiredCheck('filePath')
    } else {
        parameters.inlineScript = taskInput.getInputRequired('inlineScript')
    }

    if (parameters.disableAutoCwd) {
        parameters.workingDirectory = taskInput.getPathInputRequired('workingDirectory')
    }

    return parameters
}
