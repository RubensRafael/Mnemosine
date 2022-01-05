import {gql} from "@apollo/client";


export const LOGIN_DEV_USER = gql`
	query {
		loginUser(email: "React",password:"React")
	}

`

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
