import { Component } from 'react';

class UtilityFunctions extends Component {
	static move = (source, destination, droppableSource, droppableDestination) => {
		const sourceClone = Array.from(source);
		const destClone = Array.from(destination);
		const [removed] = sourceClone.splice(droppableSource.index, 1);

		destClone.splice(droppableDestination.index, 0, removed);

		const result = [];
		result[0] = sourceClone;
		result[1] = destClone;

		return result;
	};

	static reorder = (list, startIndex, endIndex) => {
		const result = Array.from(list);
		const [removed] = result.splice(startIndex, 1);
		result.splice(endIndex, 0, removed);
		return result;
	};

	static getIndex = (index, lists) => {
		for (var i = 0; i < lists.length; i++) {
			if (index === lists[i].id) {
				return i;
			}
		}
	}

	static getTestData() {
		return (
			[
				{
					id: "list-1",
					cards: [
						{
							id: "card-1",
							content: "card 1"
						},
						{
							id: "card-2",
							content: "card 2"
						}
					]
				},
				{
					id: "list-2",
					cards: [
						{
							id: "card-3",
							content: "card 3"
						}
					]
				},
				{
					id: "list-3",
					cards: [
						{
							id: "card-4",
							content: "card 4"
						},
						{
							id: "card-5",
							content: "card 5"
						},
						{
							id: "card-6",
							content: "card 6"
						},
						{
							id: "card-7",
							content: "card 7"
						}
					]
				},
				{
					id: "list-4",
					cards: []
				}
			]
		)
	}
}


export default UtilityFunctions;