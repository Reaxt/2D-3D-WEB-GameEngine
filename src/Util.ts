type EasingFunc = {
    description: string;
    (initialEase:number):number;
}

export function getRandomNumber(min:number, max:number):number {
	return (Math.random() * (max - min) + min) * (Math.random() < 0.5 ? -1 : 1);
}

export function getRandomPositiveNumber(min:number, max:number):number {
	return (Math.random() * (max - min) + min);
}

export function getRandomNegativeNumber(min:number, max:number):number {
	return (Math.random() * (max - min) + min) * -1;
}
//to avoid refactoring
let pow = Math.pow;
let sqrt = Math.sqrt;
export function easeInOutCirc(x:number):number {
    return x < 0.5
        ? (1 - sqrt(1 - pow(2 * x, 2))) / 2
        : (sqrt(1 - pow(-2 * x + 2, 2)) + 1) / 2;
}

export function easeOutCirc(x:number):number {
    return sqrt(1 - pow(x - 1, 2));
}
export function easeInCirc(x:number):number {
    return 1 - sqrt(1 - pow(x, 2));
}

export function easeOutExpo(x:number):number {
    return x === 1 ? 1 : 1 - pow(2, -10 * x);
}
export function easeInExpo(x:number):number {
    return x === 0 ? 0 : pow(2, 10 * x - 10);
}
export function easeInOutExpo(x:number):number {
    return x === 0
        ? 0
        : x === 1
            ? 1
            : x < 0.5 ? pow(2, 20 * x - 10) / 2
                : (2 - pow(2, -20 * x + 10)) / 2;
}
export function easeInOutBack(x:number):number {
    const c1 = 1.70158;
    const c2 = c1 * 1.525;

    return x < 0.5
        ? (pow(2 * x, 2) * ((c2 + 1) * 2 * x - c2)) / 2
        : (pow(2 * x - 2, 2) * ((c2 + 1) * (x * 2 - 2) + c2) + 2) / 2;
}
export function easeInBack(x:number):number {
    const c1 = 1.70158;
    const c3 = c1 + 1;

    return c3 * x * x * x - c1 * x * x;
}
export function easeOutBack(x:number):number {
    const c1 = 1.70158;
    const c3 = c1 + 1;

    return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2);
}
export function easeLinear(x:number):number {
    return clamp(x,0,1);
}
export function clamp(num:number,min:number,max:number):number {
    return Math.max(min, Math.min(num,max));
}
export function lerp(start:number, end:number, percent:number, easing:(a:number)=> number = easeLinear) {
    return (start + (end-start)*easing(percent));
} 


