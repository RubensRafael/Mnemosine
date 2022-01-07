import {gql} from "@apollo/client";


export const LOGIN_DEV_USER = gql`
	query {
		loginUser(email: "React",password:"React")
	}

`

export const CREATE_FOLDER = gql`
	
	mutation ($inputName : String!){
  		createFolder(folderName: $inputName){
  			_id,
    		name
  		}
	}

`

export const CHANGE_FOLDER_NAME = gql`
	
	mutation ($inputName : String!,$folderId : String!){
  		updateFolder(folderId: $folderId, newFolderName: $inputName){
    		_id,
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
