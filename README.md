# Workspace_reactnative

<p align="center">
  <a href="" rel="noopener">
 <img width=200px height=200px src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png" alt="Project logo"></a>
</p>

<h3 align="center">Alt-Space Workspace App</h3>

---

<p align="center"> A workspace booking app for Alt-Space
    <br> 
</p>

## 📝 Table of Contents
- [About](#about)
- [Getting Started](#getting_started)
- [Usage](#usage)
- [Example](#examples)
- [Built Using](#built_using)
- [Authors](#authors)

## 🧐 About <a name = "about"></a>
The app provides the functionality to book a personal workspace coupled with additional utilities, food orders and more.

## 🏁 Getting Started <a name = "getting_started"></a>
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See [deployment](#deployment) for notes on how to deploy the project on a live system.

### Prerequisites
Node.js should be installed version v16.4.2 or above.
Android SDK & Android Studios

To install Node.js follow the link below
```
https://nodejs.org/en/download/

https://developer.android.com/studio
```

### Installing
To run the application, find you must clone this repo using 
```
git clone https://github.com/Babitdor/Workspace_reactnative.git
```
Open the root directory and run the follow
```
npm instaLL
```
This will install all the necessary dependencies required for the application.

Once done, you can run the application using the following.

#### Using Physical Android Device
* Make sure your physical android device is connected via USB cable 
* Make sure that USB debugging is turned on under Developer Options.
* To check if device is connected to ADB, open 'cmd' type in 'adb devices'

#### Using Virtual Emulated Android Device
Make sure your virtual android device using Android Studios.
* Open Android Studios
* Under More Actions
* Select Virtual Device Manager
* Setup an android device, this will require you to install certain dependencies.
* Once done, click on the play button next to the android device selected, to run the Emulated Device.


Once device is setup, you are ready to run the application.

Type the following command in the terminal referencing the root path of the app directory.
```
npx react-native run-android
```
This will run the application and launch a Metro server along with it.

## 🎈 Usage <a name="usage"></a>
## Firebase API 
### Realtime Database 
#### References
A core concept to understanding Realtime Database are references - a reference to a specific node within your database. A node can be a specific property or sub-nodes.
To create a Reference, call the ref method:
```
import database from '@react-native-firebase/database';

const reference = database().ref('/users/123');
```
NOTE: To get a reference to a database other than an 'us-central1' default database, you must pass the database URL. You can find your Realtime Database URL in the Realtime Database section of the Firebase console.

```
import { firebase } from '@react-native-firebase/database';

const reference = firebase
  .app()
  .database('https://<databaseName>.<region>.firebasedatabase.app/')
  .ref('/users/123');
```
### Reading data

The Realtime Data provides the ability to read the value of a reference as a one-time read, or realtime changes to the node. When a value is read from the database, the API returns a DataSnapshot.

The snapshot includes information such as whether the reference node exists, it's value or any children the node has and more.

#### One-time read
To read the value once, call the once method on a reference:
```
import database from '@react-native-firebase/database';

database()
  .ref('/users/123')
  .once('value')
  .then(snapshot => {
    console.log('User data: ', snapshot.val());
  });
```
#### Realtime changes
To setup an active listener to react to any changes to the node and it's children, call the on method with an event handler:
```
import database from '@react-native-firebase/database';

database()
  .ref('/users/123')
  .on('value', snapshot => {
    console.log('User data: ', snapshot.val());
  });
```
### Writing data
#### Setting data
The set method on a Reference overwrites all of the existing data at that reference node. The value can be anything; a string, number, object etc:
```
import database from '@react-native-firebase/database';

database()
  .ref('/users/123')
  .set({
    name: 'Ada Lovelace',
    age: 31,
  })
  .then(() => console.log('Data set.'));
```
#### Updating data
Rather than overwriting all existing data, the update method provides the ability to update any existing data on the reference node. Firebase will automatically merge the data depending on what currently exists.
```
import database from '@react-native-firebase/database';

database()
  .ref('/users/123')
  .update({
    age: 32,
  })
  .then(() => console.log('Data updated.'));
```

### Cloud Firestore

#### Collections & Documents
Cloud Firestore stores data within "documents", which are contained within "collections", and documents can also contain collections. For example, we could store a list of our users documents within a "Users" collection. The collection method allows us to reference a collection within our code:
```
import firestore from '@react-native-firebase/firestore';

const usersCollection = firestore().collection('Users');
```
The collection method returns a CollectionReference class, which provides properties and methods to query and fetch the data from Cloud Firestore. We can also directly reference a single document on the collection by calling the doc method:
```
import firestore from '@react-native-firebase/firestore';

// Get user document with an ID of ABC
const userDocument = firestore().collection('Users').doc('ABC');
```
The doc method returns a DocumentReference.

A document can contain different types of data, including scalar values (strings, booleans, numbers), arrays (lists) and objects (maps) along with specific Cloud Firestore data such as Timestamps, GeoPoints, Blobs and more.

### Read Data
Cloud Firestore provides the ability to read the value of a collection or document. This can be read one-time, or provide realtime updates when the data within a query changes.

### Realtime changes
To setup an active listener to react to any changes to the query, call the onSnapshot method with an event handler callback. For example, to watch the entire "Users" collection for when any documents are changed (removed, added, modified):
```
import firestore from '@react-native-firebase/firestore';

function onResult(QuerySnapshot) {
  console.log('Got Users collection result.');
}

function onError(error) {
  console.error(error);
}

firestore().collection('Users').onSnapshot(onResult, onError);
```
The onSnapshot method also returns a function, allowing you to unsubscribe from events. This can be used within any useEffect hooks to automatically unsubscribe when the hook needs to unsubscribe itself:
```
import React, { useEffect } from 'react';
import firestore from '@react-native-firebase/firestore';

function User({ userId }) {
  useEffect(() => {
    const subscriber = firestore()
      .collection('Users')
      .doc(userId)
      .onSnapshot(documentSnapshot => {
        console.log('User data: ', documentSnapshot.data());
      });

    // Stop listening for updates when no longer required
    return () => subscriber();
  }, [userId]);
}
```
Realtime changes via the onSnapshot method can be applied to both collections and documents.

### Writing Data

#### Adding documents
To add a new document to a collection, use the add method on a CollectionReference:
```
import firestore from '@react-native-firebase/firestore';

firestore()
  .collection('Users')
  .add({
    name: 'Ada Lovelace',
    age: 30,
  })
  .then(() => {
    console.log('User added!');
  });
```
The add method adds the new document to your collection with a random unique ID. If you'd like to specify your own ID, call the set method on a DocumentReference instead:
```
import firestore from '@react-native-firebase/firestore';

firestore()
  .collection('Users')
  .doc('ABC')
  .set({
    name: 'Ada Lovelace',
    age: 30,
  })
  .then(() => {
    console.log('User added!');
  });
```
### Updating documents
The set method exampled above replaces any existing data on a given DocumentReference. if you'd like to update a document instead, use the update method:

```
import firestore from '@react-native-firebase/firestore';

firestore()
  .collection('Users')
  .doc('ABC')
  .update({
    age: 31,
  })
  .then(() => {
    console.log('User updated!');
  });
```
The method also provides support for updating deeply nested values via dot-notation:
```
import firestore from '@react-native-firebase/firestore';

firestore()
  .collection('Users')
  .doc('ABC')
  .update({
    'info.address.zipcode': 94040,
  })
  .then(() => {
    console.log('User updated!');
  });
```
## Project Usage of Firebase API Examples <a name ="examples"></a>

### Realtime Database

#### Seat Layout
This is how the app reads the seat layout from firebase's realtime database using 'Realtime changes' READ TYPE
```
async function FetchData() {
      var snapshot = await firebase
        .app()
        .database()
        .ref('/Data/Tables/')
        .on('value', snapshot => {
          setTable(snapshot.val());
          setTable1(snapshot.val()[0].seats);
          setTable2(snapshot.val()[1].seats);
          setTable3(snapshot.val()[2].seats);
          setTable4(snapshot.val()[3].seats);
          setTable5(snapshot.val()[4].seats);
          setTable6(snapshot.val()[5].seats);
          setTable7(snapshot.val()[6].seats);
        });
      return () => database().ref(`/Data/Tables/`).off('value', snapshot);
    }
```
#### Table Description Data
This is how the app reads the table information and images from firebase's realtime database using 'one-time read' READ TYPE
```
 async function FetchData() {
      var snapshot = await firebase
        .app()
        .database()
        .ref('/Data/Tables/')
        .once('value', snapshot => {
          SetDatabase(snapshot.val());
        });
    }
```
#### Additional Items or Addons 

This is how the app reads the Additional Items or Addons from firebase's realtime database using 'one-time read' READ TYPE
```
async function FetchData() {
      var snapshot = await firebase
        .app()
        .database()
        .ref('/Data/Items/')
        .once('value', snapshot => {
          setITEMS(snapshot.val());
          setOldITEMS(snapshot.val());
        });
    }
```

### Database References (Firebase)
#### Tables Information and Seat Layout of Each Table
```.database()
.ref('/Data/Tables/')
```
This references as follows (Example)
```
"Tables": [
    {
      "id": 1,
      "title": "Table-A",
      "price": 120,
      "perks": [
        "Free Internet for upto 10GB",
        "4 Cup of Coffee For Free",
        "4 Notebook Free"
      ],
      "description": ["Casual,Formal,Chill,Work,Fun"],
      "image": [
        "https://images.steelcase.com/image/upload/c_fill,dpr_auto,q_70,h_656,w_1166/v1504705535/www.steelcase.com/2017/09/06/16-0014178.jpg",
        "https://media.istockphoto.com/id/1093508248/photo/modern-work-table-with-computer-laptop-and-cityscapes-view-from-window-business-concepts-ideas.jpg?s=612x612&w=0&k=20&c=vpMc1UR6KfgPe4GYcFG4x1FfPKLyYsoKqrAJolfBSZs=",
        "https://media.istockphoto.com/id/1182529932/photo/workplace-desk-with-computer-at-window-in-office-at-home-in-apartment.jpg?s=612x612&w=0&k=20&c=GWNRgerMA6ev7N_VYjJ5qOOfHpY1ir__U1vfa_1I5j0="
      ],
      "seats": [
        {"id": "A1", "empty": true, "booked": false},
        {"id": "A2", "empty": true, "booked": false}
      ]
    },
 ]
```
For a clear picture of how it should look, the 'json' folder in the directory contains the 'Database.json'.

### Updating Seat Booking Status 

Here 'booked' can be interpreted as available
Here 'empty' indicates whether the seat is occupied or available

The two parameters determines the seat UI status in the booking screen.

On Selecting and Proceeding on Booking the Seat, the following code, updates the seat status in the database in realtime.
```
database()
    .ref(`/Data/Tables/${i}/seats/${j}`)
    .update({
              booked: false,
              empty: false,
            })
```

### Cloud Firestore

#### Storing Ticket Information (ViewCart.js Component)
On successful booking of a workspace, the app stores the booking information or receipt in Cloud Firestore using the following code.
* Same Applies to the Conference Booking and Coffee & Convo Option
```
firestore()
    .collection('BookATable')
    .doc(user.uid)
    .collection('Orders')
    .doc(BookingID)
    .set(
      {
        Type: 'Table Booking',
        BookingID: BookingID,
        email: user.email,
        items: items,
        Date: SelectDate,
        StartTime: MinTime,
        EndTime: MaxTime,
        total: totalRs,
        seatsNo: seatid,
        createdAt: firestore.FieldValue.serverTimestamp(),
      },
      {merge: true},
    )
```

#### Reading the Ticket Information (HistoryPage Component)
This is how the app reads the user's Booked Tickets from Cloud Firestore Database using User UID
```
const snapshot = await firebase
        .firestore()
        .collection(TicketType)
        .doc(user.uid)
        .collection('Orders')
        .onSnapshot(documentSnapshot => {
          setTickets(documentSnapshot.docs);
        });
```
### Profile Update 
Since Firestore Authetication does not support profile page information, therefore, i creating a way to store user details in user UID, in Cloud Firestore.
The following code is for updating the profile screen. Associated code related to Authetication can be found in the 'AuthProvider.js'
```
try {
            const db = firestore().collection('Users').doc(user.uid);
            db.set(
              {
                Name: Name,
                Date_of_Birth: DateofBirth,
                PhoneNo: PhoneNo,
                Gender: Gender,
                email: user.email,
                CreatedAt: firestore.FieldValue.serverTimestamp(),
                Identification: ID_NAME,
              },
              {merge: true},
            ).then(() => {
              async function ImageData() {
                try {
                  let {uri} = ProfileImage;
                  let uploadUri =
                    Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
                  const task = await storage()
                    .ref('Profile/' + user.uid)
                    .putFile(uploadUri)
                    .then(() => console.log('Information Updated'))
                    .catch(error => console.log('storage/unknown'));

                  uri = ID_IMAGE.uri;
                  console.log(uri);
                  uploadUri =
                    Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
                  // Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
                  const task1 = await storage()
                    .ref('Profile/Identification/' + user.uid)
                    .putFile(uploadUri)
                    .then(() => console.log('ID is Updated'))
                    .catch(error => console.log('storage/unknown'));
                } catch (err) {
                  console.log(err);
                }
              }
              ImageData();
              // console.log('Data Uploaded');
              // const {uri} = ProfileImage;
              // const uploadUri =
              //   Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
              // const task = storage()
              //   .ref('Profile/' + user.uid)
              //   .putFile(uploadUri)
              //   .then(() => console.log('Information Updated'));
            });
          } catch (e) {
            console.log(e);
          }
```

## ⛏️ Built Using <a name = "built_using"></a>
- [Firebase](https://firebase.google.com) - Database
- [React Native](https://reactnative.dev) - React JS-based Mobile framework
- [NodeJs](https://nodejs.org/en/) - Server Environment
- [React Redux](https://react-redux.js.org) - State Management

## ✍️ Authors <a name = "authors"></a>
- [@Babitdor](https://github.com/Babitdor) - Idea & Initial work

