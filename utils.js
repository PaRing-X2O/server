export const filterMap = (data) => {
	const filtered = Object.keys(data).filter((key) => data[key]).reduce((obj, key) => {
		return {
			...obj,
			[key]: data[key]
		};
	}, {});
	return filtered;
};
