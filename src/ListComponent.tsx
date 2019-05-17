import React from "react";
const intersectionObserverOptions = {
	root: null,
	rootMargin: "150px",
	threshold: 1.0
};

const onIntersection = (entries: any[]) => {
	entries.forEach(entry => {
		if (entry.intersectionRatio > 0) {
			console.log(entry.intersectionRatio, entry.target.className, entry);
			// entry.target.dataset = {
			// 	...entry.target.dataset,
			// 	isInterected: true
			// };
		}
	});
};

const Row = (i: number, ref: React.RefObject<HTMLDivElement>) => {
	return <div key={i} ref={ref} id={`${i}`} className={`row${i}`}>{`Row ${i}`}</div>;
};

interface IObjectRow {
	create: (i: number, ref: React.RefObject<HTMLDivElement>) => JSX.Element;
	ref: React.RefObject<HTMLDivElement>;
	observer: any;
}

const rows: IObjectRow[] = [];
for (let i = 0; i < 100; i++) {
	const observer = new IntersectionObserver(onIntersection, intersectionObserverOptions);
	const ref = React.createRef<HTMLDivElement>();

	rows[i] = {
		create: (i, ref) => Row(i, ref),
		ref,
		observer
	};
}

const ListComponent = () => {
	React.useEffect(() => {
		console.log("Assigning Observers");
		rows.forEach((row, index) => {
			if (row.ref.current) {
				row.observer.observe(row.ref.current);
			}
		});
	}, []);

	console.log("Rendering list");

	return (
		<div>
			{rows.map((row, i) => {
				return row.create(i, row.ref);
			})}
		</div>
	);
};

export default ListComponent;
