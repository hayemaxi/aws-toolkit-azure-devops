
/*!
 * Copyright 2019 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 * SPDX-License-Identifier: MIT
 */

    
/* NOTE! this file is auto-generated by generateResources.ts, do not edit it by hand. */


/*!
 * Copyright 2019 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 * SPDX-License-Identifier: MIT
 */

    
/* NOTE! this file is auto-generated by generateResources.ts, do not edit it by hand. */

export type CloudFormationDeleteStackInput = {
    awsCredentials: string
    regionName: string
    stackName: string
    logRequest: boolean
    logResponse: boolean
}

export type CloudFormationDeleteStackMessages = 
    | 'RequestingStackDeletion'
    | 'WaitingForStackDeletion'
    | 'StackDeletionFailed'
    | 'StackDeleted'
    | 'StackDoesNotExist'
    | 'TaskCompleted'
