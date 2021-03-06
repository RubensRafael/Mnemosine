import {gql} from "@apollo/client";



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

export const REMOVE_ITEM = gql`
    
    mutation($targetId: String!, $level: Int!){
		deleteTarget(level: $level, targetId: $targetId)
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
					},
					name

					
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

export const TO_COMPLETE_NOTE = gql`

	mutation($noteId: String!,$complete: Boolean!, $modifiedAt: String!){
	 	updateNote(noteId: $noteId,complete: $complete, modifiedAt: $modifiedAt){
	 		_id,
	 	 	title
	 	 }
	 }
`

export const LIST_NOTES = gql`
	query($folder_id: String!){
			getUser{
				mainOrActualFolder(folderId:$folder_id){
      				notes{
      					_id
						title,
						content,
						expiresIn,
						completed
      				}
				}
					
			}
	}
`

export const CHANGE_NOTE_FOLDER = gql`
	mutation($noteId: String!,$from: String!, $to:String! , $modifiedAt: String!){
	 	updateNote(noteId: $noteId,fromFolder: $from, toFolder: $to ,modifiedAt: $modifiedAt){
	 		_id,
	 	 	title
	 	 }
	 }
`




export const GET_MORE_NOTE_INFO = gql`
	query($noteId: String!){
	 	getOneNote(noteId: $noteId){
	 		expiresIn,
	 		createdAt,
	 		lastModification{
	 			when
	 		} 
	 	 }
	 }
`


export const UPDATE_NOTE = gql`
	mutation($noteId: String,$title: String, $content:String, $complete:Boolean, $expiresIn:String, $modifiedAt: String){
	 	updateNote(noteId: $noteId,title: $title, content:$content, complete:$complete, expiresIn:$expiresIn, modifiedAt: $modifiedAt){
	 		_id
	 	 }
	 }
`

export const CREATE_USER = gql`
	mutation($name: String, $email: String, $password: String){
	 	createUser(name: $name,email: $email, password:$password)
	 }
`

export const LOGIN_USER = gql`
	query($email: String, $password: String){
	 	loginUser(email: $email, password:$password)
	 }
`


