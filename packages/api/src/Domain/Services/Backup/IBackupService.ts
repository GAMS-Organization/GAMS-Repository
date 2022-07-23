/**
 * Browse the link below to see the complete object returned for folder/file creation and search
 *
 * @link https://developers.google.com/drive/api/v3/reference/files#resource
 */
export type PartialDriveFile = {
  id: string;
  name: string;
};

export type SearchResultResponse = {
  kind: 'drive#fileList';
  nextPageToken: string;
  incompleteSearch: boolean;
  files: PartialDriveFile[];
};
