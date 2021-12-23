import {gql} from "@apollo/client";
export const FOLDER_LIST = gql`
		query {
				getUser{
					folderList{
						_id,
						name,
						count,
						completed,
						dates,
						isMain
					}
					
				}
			}
		`