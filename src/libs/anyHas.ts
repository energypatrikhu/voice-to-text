export default function anyHas(string: string | string[], include: any | any[] = null, exclude: any | any[] = null) {
	if (null !== exclude) {
		if ('string' == typeof exclude && string.includes(exclude)) {
			return false;
		}
		if ('object' == typeof exclude) {
			for (let exc of exclude)
				if (string.includes(exc) && '' != exc) {
					return false;
				}
		}
	}
	if (null !== include) {
		if ('string' == typeof include && string.includes(include)) {
			return true;
		}
		if ('object' == typeof include) {
			for (let inc of include)
				if (string.includes(inc) && '' != inc) {
					return true;
				}
		}
	}
	return false;
}
