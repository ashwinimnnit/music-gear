export default function (recommendedItems){
	console.log("******************************recommended- items action")
  return {
    type: "RECOMMENDED_ITEMS",
    payload: recommendedItems
  }

}