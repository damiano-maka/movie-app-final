import { Injectable, inject } from '@angular/core';
import { Firestore, collectionData} from '@angular/fire/firestore';
import {  doc,setDoc ,collection, DocumentData, query, where, QuerySnapshot, getDocs,deleteDoc, getDoc, DocumentSnapshot, DocumentReference } from 'firebase/firestore';
import { WishList } from '../models/movieID.model';

@Injectable({
  providedIn: 'root'
})
export class PostService implements PostService {
  firestore = inject(Firestore);
 

  async addMovie(movie: WishList, post_id: string, user: string | undefined): Promise<void> {
    const collectionName = user ? user : "utenti" + 1;    
    const ref = doc(this.firestore, collectionName, post_id);

    try {
      await setDoc(ref, movie);
      console.log("Document successfully written!");
    } catch (error) {
      console.error("Error writing document: ", error);
      throw error; 
    }
  }


  async getMoviesCollection(user: string | undefined): Promise<any[]> {
    const collectionName = user as string;
    const collectionRef = collection(this.firestore, collectionName);
    const q = query(collectionRef);

    try {
      const querySnapshot: QuerySnapshot<DocumentData> = await getDocs(q);
      return querySnapshot.docs.map((doc) => doc.data());
    } catch (error) {
      console.error('Error getting movies collection:', error);
      throw error; 
    }
  }


  async deleteUserDocument(movieID: string, userID: string | undefined): Promise<void> {
    if (!userID) {return;};

    const userDocRef = doc(this.firestore, userID,  movieID);
    
    try {
      await deleteDoc(userDocRef);
      console.log('Document successfully deleted!');
    } catch (error) {
      console.error('Error deleting user document:', error);
      throw error; 
    }

  }

  
 

}
  



