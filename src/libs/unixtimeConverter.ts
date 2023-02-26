export function fromUnixTime(unixTime: number): string {
    const date = new Date(unixTime); // Unix Time을 밀리초 단위로 변환하여 Date 객체 생성
    const year = date.getFullYear(); // 연도
    const month = `0${date.getMonth() + 1}`.slice(-2); // 월(0부터 시작하므로 +1을 해줌)
    const day = `0${date.getDate()}`.slice(-2); // 일
    const hour = `0${date.getHours()}`.slice(-2); // 시
    const minute = `0${date.getMinutes()}`.slice(-2); // 분
    const second = `0${date.getSeconds()}`.slice(-2); // 초
     // YYYY-MM-DD HH:mm:ss 형식으로 변환
    return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
}

export function toUnixTime(date: Date): number {
    return Math.floor(date.getTime() / 1000);
}