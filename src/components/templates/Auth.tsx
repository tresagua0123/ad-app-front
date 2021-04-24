import React from 'react';
import firebase from 'firebase/app';
import axios from 'axios';

export const Auth: React.FC = () => {

    const signInWithGoogle = () => {
        // Googleプロバイダオブジェクトのインスタンスを作成
        const provider = new firebase.auth.GoogleAuthProvider()
        // ポップアップウィンドウでログインを行う場合はsignInWithPopupを呼び出す
        firebase.auth().signInWithPopup(provider)
        .then(async user => {
            console.log(user)
            if(user.additionalUserInfo && user.user) {alert("success : " + user.user.displayName + "さんでログインしました");
        // const idTokenResult = () => user.user?.getIdToken().then(res => res);
        railsLogin(user.additionalUserInfo.isNewUser, await user.user?.getIdToken())
        };
          })
          .catch(error => {
              alert(error.message);
          });
    }

    const csrfTokenObj = () => {
        const csrfToken = document.querySelector('meta[name="csrf-token"]')
        return { "X-CSRF-TOKEN": csrfToken };
      }
      
      const authorizationObj = (idToken: string) => {
        return { "Authorization": `Bearer ${idToken}` };
      }

    const railsLogin = async (isNewUser: boolean, idToken: string) => {
        // const url = isNewUser ? "/accounts" : "/login";
        const url = "/accounts";
    
        axios.post(`${process.env.REACT_APP_FIREBASE_API_ENDPOINT}${url}`, { data: {} }, {
            headers: { ...csrfTokenObj(), ...authorizationObj(idToken)},
        })
        .then((res) => 
            console.log(res), 
        error => {
            console.log(error.message)
        });
    }
    
    
    return (
            <div>
                <div className="login">
                    <h1>ログイン</h1>
                </div>
                <div className="signin_button">
                    <img src="../btn_google_signin.png" onClick={()=>signInWithGoogle()} alt="google signin"/>
                </div>
            </div>
        );
}
