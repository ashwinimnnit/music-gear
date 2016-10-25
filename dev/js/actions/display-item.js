
export default function displayItemAction(item){
   return {
     type: "DISPLAY_SELECTED_ITEM",
     payload: item,
     itemReceived: true
   }
 }
