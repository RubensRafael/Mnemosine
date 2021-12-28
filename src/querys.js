import {gql} from "@apollo/client";

export const CREATE_FOLDER = gql`
	
	mutation ($inputName : String!){
  		createFolder(folderName: $inputName){
    		name
  		}
	}

`
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
