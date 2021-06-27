var db = {
    dbName:"",
    storeName:"",
    version:1,
    instance:null,
    storeOptions:{},
    result:null,
    init: (callback) => {
        var request = window.indexedDB.open(db.dbName, db.version);
        request.onsuccess = function(event) {
            var instance = request.result;
            callback(instance);
        }
        request.onupgradeneeded = function(event) {
            var instance = event.target.result;
            instance.createObjectStore(db.storeName, db.storeOptions);
            callback(instance);
        }
    },
    get:(instance,key,callback) => {
        var transaction = instance.transaction([db.storeName]);
        var objectStore = transaction.objectStore(db.storeName);
        var request = objectStore.get(key);
        
        request.onerror = function(event) {
           alert("Unable to retrieve data from database!");
        };
        
        request.onsuccess = function(event) {
           // Do something with the request.result!
           if(request.result) {
              callback(request.result)
              result = request.result
           }
        };
    },
    add:(instance,data,callback) => {
        if(instance){
        var request = instance.transaction([db.storeName], "readwrite")
            .objectStore(db.storeName)
            .add(data);
            
            request.onsuccess = function(event) {
               callback({status:200,responseText:"data added successfully"})
            };
            
            request.onerror = function(event) {
                callback({status:400,responseText:"data added successfully"})
            }
        }
        console.warn("You fucked up")
    }
}