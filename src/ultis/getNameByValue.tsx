export const getNameByValue = (options: any, value: string): string => {
    const item = options.find((item: any) => item.value === value);
    return item?.name;
};