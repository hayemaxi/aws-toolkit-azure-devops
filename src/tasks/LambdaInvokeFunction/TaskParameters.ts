/*!
 * Copyright 2019 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 * SPDX-License-Identifier: MIT
 */

import { InvocationType, LogType } from '@aws-sdk/client-lambda'
import { AWSConnectionParameters, buildConnectionParameters } from 'lib/awsConnectionParameters'
import { getInputOrEmpty, getInputRequired } from 'lib/vstsUtils'

export interface TaskParameters {
    awsConnectionParameters: AWSConnectionParameters
    functionName: string
    payload: string
    invocationType: InvocationType
    logType: string
    outputVariable: string
}

export function buildTaskParameters(): TaskParameters {
    return {
        awsConnectionParameters: buildConnectionParameters(),
        functionName: getInputRequired('functionName'),
        payload: getInputOrEmpty('payload'),
        invocationType: getInputOrEmpty('invocationType') as InvocationType,
        logType: getInputOrEmpty('logType') as LogType,
        outputVariable: getInputOrEmpty('outputVariable')
    }
}
