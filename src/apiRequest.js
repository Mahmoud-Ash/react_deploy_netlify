const apiRequest = async (url='',req=null, errMsg=null ) => {
     try {
        const response = await fetch(url, req);
        if (!response) throw new Error("Please reaload th page");
     } catch (error) {
        errMsg=error;
     } finally {
        return errMsg;
     }
}

export default apiRequest;