//Stole from the teacher, and the "stolen" from sba318 submission
export default function error(status, msg) {
    var err = new Error(msg);
    err.status = status;
    return err;
}