export const mainCategory = [
    {
        name: "PC",
        categoryId: "pc",
        level: 1,
        levelTwoCategory: [
            {
                "name": "Action",
                "categoryId": "pc_games",
                "parentCategoryId": "pc",
                "level": 2

            },
            {
                "name": "Adventure",
                "categoryId": "pc_games",
                "parentCategoryId": "pc",
                "level": 2

            },
            {
                "name": "Sports",
                "categoryId": "pc_games",
                "parentCategoryId": "pc",
                "level": 2

            },
            {
                "name": "Thriller",
                "categoryId": "pc_games",
                "parentCategoryId": "pc",
                "level": 2

            },
            {
                "name": "Horror",
                "categoryId": "pc_games",
                "parentCategoryId": "pc",
                "level": 2

            },
            {
                "name": "Telltale games",
                "categoryId": "pc_games",
                "parentCategoryId": "pc",
                "level": 2

            },
        ]
    },

    {
        name: "PS5 Games", // New category name
        categoryId: "ps",
        level: 1,
        levelTwoCategory: [
            {
                "name": "PS5 Action Games", // New subcategory name
                "categoryId": "ps5_games",
                "parentCategoryId": "ps",
                "level": 2
            },
            {
                "name": "PS5 Adventure Games", // New subcategory name
                "categoryId": "ps5_games",
                "parentCategoryId": "ps",
                "level": 2
            },
            {
                "name": "PS5 Sports Games", // New subcategory name
                "categoryId": "ps5_games",
                "parentCategoryId": "ps",
                "level": 2
            },
            {
                "name": "PS5 Thriller Games", // New subcategory name
                "categoryId": "ps5_games",
                "parentCategoryId": "ps",
                "level": 2
            },
            {
                "name": "PS5 Horror Games", // New subcategory name
                "categoryId": "ps5_games",
                "parentCategoryId": "ps",
                "level": 2
            },
            {
                "name": "PS5 Narrative Games", // New subcategory name
                "categoryId": "ps5_games",
                "parentCategoryId": "ps",
                "level": 2
            },
        ]
    },

    {
        name: "Trending",
        categoryId: "trending",
        level: 1,
        levelTwoCategory: [
            // Trending for PC
            { "name": "Trending Action", "categoryId": "t_games", "parentCategoryId": "trending", "level": 2 },
            { "name": "Trending Adventure", "categoryId": "t_games", "parentCategoryId": "trending", "level": 2 },
            { "name": "Trending Sports", "categoryId": "t_games", "parentCategoryId": "trending", "level": 2 },
            { "name": "Trending Thriller", "categoryId": "t_games", "parentCategoryId": "trending", "level": 2 },
            { "name": "Trending Horror", "categoryId": "t_games", "parentCategoryId": "trending", "level": 2 },
            { "name": "Trending Telltale Games", "categoryId": "t_games", "parentCategoryId": "trending", "level": 2 },
            // Trending for PS5
            { "name": "Trending PS5 Action", "categoryId": "t_games", "parentCategoryId": "trending", "level": 2 },
            { "name": "Trending PS5 Adventure", "categoryId": "t_games", "parentCategoryId": "trending", "level": 2 },
            { "name": "Trending PS5 Sports", "categoryId": "t_games", "parentCategoryId": "trending", "level": 2 },
            { "name": "Trending PS5 Thriller", "categoryId": "t_games", "parentCategoryId": "trending", "level": 2 },
            { "name": "Trending PS5 Horror", "categoryId": "t_games", "parentCategoryId": "trending", "level": 2 },
            { "name": "Trending PS5 Narrative", "categoryId": "t_games", "parentCategoryId": "trending", "level": 2 }
        ]
    },
    {
        name: "Gaming Devices",
        categoryId: "devices",
        level: 1
    }

] 