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
}`

export const CHANGE_FOLDER_TOMAIN = gql`
    
     mutation ($folderId: String!){
		 updateFolder(folderId: $folderId,toMain: true){
			 _id
		 }
	 }

`

export const REMOVE_FOLDER = gql`
    
    mutation($folderId: String!){
		deleteTarget(level: 2, targetId: $folderId)
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

export const CREATE_NOTE = gql`

	mutation($title: String!,$content:String!,$folderId: String!,$expiresIn:String!,$createdAt:String!){
		createNote(title:$title , content:$content , createdAt: $createdAt , expiresIn:$expiresIn,folderId:$folderId  ){
			_id,
			title
		}
	}

`