# =============================================================
#  data.py  –  All site content lives here.
#  Edit this file to change slides, products, articles, stats,
#  offers, nav links, or footer columns — no HTML needed.
# =============================================================

# ── Navigation links ─────────────────────────────────────────
NAV_LINKS = [
    {"label": "Products",       "href": "#products"},
    {"label": "Brands",         "href": "#brands"},
    {"label": "Magazine",       "href": "#magazine"},
    {"label": "Offers & Promos","href": "#offers"},
    {"label": "Company",        "href": "#about"},
    {"label": "Careers",        "href": "#careers"},
    {"label": "Trade",          "href": "#trade"},
]

# ── Carousel slides ───────────────────────────────────────────
SLIDES = [
    {
        "index":   0,
        "image":   "images/slide-1.jpg",
        "alt":     "Fresh milk and breakfast spread",
        "tag":     "New Arrival",
        "heading": "Pure & Fresh<br>Every Morning",
        "btn":     "Discover More",
        "link":    "#products",
    },
    {
        "index":   1,
        "image":   "images/slide-2.jpg",
        "alt":     "Orange juice and healthy breakfast",
        "tag":     "Health & Wellness",
        "heading": "Naturally Full<br>of Vitamins",
        "btn":     "Explore Now",
        "link":    "#products",
    },
    {
        "index":   2,
        "image":   "images/slide-3.jpg",
        "alt":     "Yogurt and fresh berries",
        "tag":     "Family Favourite",
        "heading": "Light on Calories,<br>Big on Taste",
        "btn":     "See Products",
        "link":    "#products",
    },
    {
        "index":   3,
        "image":   "images/slide-4.jpg",
        "alt":     "Cheese and dairy platter",
        "tag":     "Premium Range",
        "heading": "Crafted with<br>Tradition",
        "btn":     "Learn More",
        "link":    "#products",
    },
]

# ── Featured products ─────────────────────────────────────────
PRODUCTS = [
    {
        "image":    "images/slide-4.jpg",
        "alt":      "Whole Milk 1L",
        "badge":    "Best Seller",
        "badge_cls":"",
        "category": "Fresh Milk",
        "name":     "Whole Milk 1L",
        "desc":     "Full-fat whole milk, rich in calcium and natural goodness.",
        "link":     "#",
    },
    {
        "image":    "images/slide-1.jpg",
        "alt":      "Low-Fat Yogurt",
        "badge":    "New",
        "badge_cls":"new",
        "category": "Yogurt",
        "name":     "Low-Fat Yogurt",
        "desc":     "Creamy, light yogurt made from the finest fresh milk.",
        "link":     "#",
    },
    {
        "image":    "images/slide-2.jpg",
        "alt":      "Fresh Orange Juice",
        "badge":    None,
        "badge_cls":"",
        "category": "Juices",
        "name":     "Fresh Orange Juice",
        "desc":     "Squeezed from sun-ripened oranges, no added sugar.",
        "link":     "#",
    },
    {
        "image":    "images/slide-3.jpg",
        "alt":      "Mixed Berry Blend",
        "badge":    "Promo",
        "badge_cls":"promo",
        "category": "Smoothies",
        "name":     "Mixed Berry Blend",
        "desc":     "A vibrant mix of raspberries, blueberries, and strawberries.",
        "link":     "#",
    },
]

# ── Brand stats ───────────────────────────────────────────────
STATS = [
    {"number": "130+", "label": "Years of Excellence"},
    {"number": "50+",  "label": "Product Lines"},
    {"number": "30",   "label": "Countries"},
    {"number": "10M+", "label": "Happy Families"},
]

# ── Magazine / editorial articles ────────────────────────────
MAGAZINE_FEATURED = {
    "image":   "images/magazine-1.jpg",
    "alt":     "Healthy breakfast bowl",
    "tag":     "Recipes",
    "title":   "5 Ways to Start Your Morning Right",
    "date":    "June 12, 2026",
    "read":    "4 min read",
    "link":    "#",
}

MAGAZINE_SIDEBAR = [
    {
        "image":   "images/magazine-2.jpg",
        "alt":     "Homemade dish",
        "tag":     "Cooking Tips",
        "title":   "The Secret to a Creamy Béchamel",
        "excerpt": "Learn the classic technique that turns an ordinary white sauce into something extraordinary.",
        "date":    "May 28, 2026",
        "read":    "3 min read",
        "link":    "#",
    },
    {
        "image":   "images/magazine-3.jpg",
        "alt":     "Fresh berries",
        "tag":     "Nutrition",
        "title":   "Why Calcium Matters at Every Age",
        "excerpt": "From growing kids to active adults, calcium is one nutrient you simply can't skip.",
        "date":    "May 14, 2026",
        "read":    "5 min read",
        "link":    "#",
    },
]

# ── Offers banner ─────────────────────────────────────────────
OFFER = {
    "eyebrow":  "Limited Time",
    "heading":  "Summer Freshness Sale",
    "desc":     "Enjoy up to <strong>20% off</strong> selected dairy and juice products. Available in-store and online — while stocks last.",
    "btn":      "Shop the Sale",
    "link":     "#",
    "image":    "images/offers.jpg",
    "alt":      "Summer sale produce",
}

# ── Footer columns ────────────────────────────────────────────
FOOTER_COLS = [
    {
        "heading": "Products",
        "links": [
            {"label": "Fresh Milk",      "href": "#"},
            {"label": "Yogurt",          "href": "#"},
            {"label": "Cheese",          "href": "#"},
            {"label": "Butter & Cream",  "href": "#"},
            {"label": "Juices & Drinks", "href": "#"},
        ],
    },
    {
        "heading": "Company",
        "links": [
            {"label": "About Us",       "href": "#"},
            {"label": "Our Brands",     "href": "#"},
            {"label": "Sustainability", "href": "#"},
            {"label": "Careers",        "href": "#"},
            {"label": "Press Room",     "href": "#"},
        ],
    },
    {
        "heading": "Help",
        "links": [
            {"label": "Customer Support", "href": "#"},
            {"label": "Find a Store",     "href": "#"},
            {"label": "FAQ",              "href": "#"},
            {"label": "Contact Us",       "href": "#"},
        ],
    },
]

FOOTER_LEGAL = [
    {"label": "Privacy Policy",  "href": "#"},
    {"label": "Cookie Settings", "href": "#"},
    {"label": "Terms of Use",    "href": "#"},
]
