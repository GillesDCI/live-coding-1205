/**
 * Controller method to get the current version.
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
export const getVersion = (req, res) => {
    return res.status(200).json({version:'7.0.1'});
}