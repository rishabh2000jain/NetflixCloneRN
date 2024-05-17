import AsyncStorage from "@react-native-async-storage/async-storage";

enum StorageKeys {
    onboardingShown = 'onboardingShown',
    isLoggedIn = 'isLoggedIn',
};


const setValue = async ({ key, value }: { key: StorageKeys, value: string }): Promise<boolean> => {
    try {
        console.log('====================================');
        console.log(key,value);
        console.log('====================================');
        await AsyncStorage.setItem(key, value);
        return true;
    } catch (e) {
        console.log('====================================');
        console.log(e);
        console.log('====================================');
        return false;
    }
};

const getValue = async (key: StorageKeys,defaultValue:string): Promise<string> => {
    try {
        return (await AsyncStorage.getItem(key))??defaultValue;
    } catch (e) {
        console.log('====================================');
        console.log(e);
        console.log('====================================');
    }
    return defaultValue;
};




const clearValues = async (): Promise<boolean> => {
    try {
        await AsyncStorage.clear();
        return true;
    } catch (e) {
        console.log('====================================');
        console.log(e);
        console.log('====================================');
        return false;
    }
};
export default StorageKeys;
export { setValue, getValue, clearValues };