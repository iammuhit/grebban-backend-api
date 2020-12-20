const path = require('path');
const config = require(path.resolve(process.env.PATH_BASE, 'config/pagination'));

class Pagination {

    create (total, limit, current_page) {
        current_page = parseInt(current_page) || 1;
        limit = parseInt(limit) || config.limit;
        
        let offset = limit * (current_page - 1);
        
        // avoid having a negative offset
        if (offset < 0) {
            offset = 0;
            current_page = 1;
        }
    
        return {
            'current_page': current_page,
            'per_page': limit,
            'limit': limit,
            'offset': offset,
            'total_pages': Math.ceil(total / limit)
        };
    }

}

module.exports = Pagination;