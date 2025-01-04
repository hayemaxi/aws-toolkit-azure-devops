
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

export type AWSShellScriptInput = {
    awsCredentials: string
    regionName: string
    arguments: string
    scriptType: 'filePath' | 'inline'
    filePath: string
    inlineScript: string
    disableAutoCwd: boolean
    workingDirectory: string
    failOnStandardError: boolean
}

export type AWSShellScriptMessages = 
    | 'BashReturnCode'
    | 'BashFailed'
    | 'BashUnableToFindScript'
