export default function cleartemAction(item ={}){
   return {
     type: "CLEAR_ITEM_FROM_STORE",
     payload: item
   }
 }