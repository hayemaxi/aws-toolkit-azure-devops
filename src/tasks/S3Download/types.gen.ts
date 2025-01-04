
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

export type S3DownloadInput = {
    awsCredentials: string
    regionName: string
    bucketName: string
    sourceFolder: string
    globExpressions: string
    targetFolder: string
    keyManagement: 'noneOrAWSManaged' | 'customerManaged'
    customerKey: string
    overwrite: boolean
    forcePathStyleAddressing: boolean
    flattenFolders: boolean
    logRequest: boolean
    logResponse: boolean
}

export type S3DownloadMessages = 
    | 'FileOverwriteWarning'
    | 'FileExistsError'
    | 'ListingKeysFromPrefix'
    | 'ListingKeysFromRoot'
    | 'QueueingDownload'
    | 'GlobbingFromPrefix'
    | 'GlobbingFromRoot'
    | 'MatchedKey'
    | 'DownloadingFiles'
    | 'BucketNotExist'
    | 'TaskCompleted'
