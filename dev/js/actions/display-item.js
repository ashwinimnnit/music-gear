
export default function displayItemAction(item){
	console.log("displat selected item", item)
   return {
     type: "DISPLAY_SELECTED_ITEM",
     payload: item,
     itemReceived: true
   }
 }
