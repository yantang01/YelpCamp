// To write a function to wrap async functions and catch errors
function catchAsync(fn) {
    return function (req, res, next) {
        fn(req, res, next).catch(e => { next(e) })
    }
}

module.exports = catchAsync;