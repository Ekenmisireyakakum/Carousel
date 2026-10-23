# =============================================================
#  app.py  –  Flask application for Tanova Kitchen
#
#  Run:  python app.py
#  Then open:  http://localhost:5000
# =============================================================

from flask import Flask, render_template, jsonify
import data

app = Flask(__name__)


# ── Main page ─────────────────────────────────────────────────
@app.route("/")
def index():
    """Render the homepage with all content from data.py."""
    return render_template(
        "index.html",
        nav_links       = data.NAV_LINKS,
        slides          = data.SLIDES,
        products        = data.PRODUCTS,
        stats           = data.STATS,
        mag_featured    = data.MAGAZINE_FEATURED,
        mag_sidebar     = data.MAGAZINE_SIDEBAR,
        offer           = data.OFFER,
        footer_cols     = data.FOOTER_COLS,
        footer_legal    = data.FOOTER_LEGAL,
    )


# ── JSON API endpoints (Python controls the data) ─────────────
@app.route("/api/slides")
def api_slides():
    """Return carousel slide data as JSON."""
    return jsonify(data.SLIDES)


@app.route("/api/products")
def api_products():
    """Return product data as JSON."""
    return jsonify(data.PRODUCTS)


@app.route("/api/stats")
def api_stats():
    """Return brand stats as JSON."""
    return jsonify(data.STATS)


# ── Newsletter signup (POST) ───────────────────────────────────
@app.route("/subscribe", methods=["POST"])
def subscribe():
    """Handle newsletter form submission from the browser."""
    from flask import request
    email = request.form.get("email", "").strip()

    if not email or "@" not in email:
        return jsonify({"ok": False, "message": "Invalid email address."}), 400

    # In a real app: save to a database or send to a mailing list API.
    # For now, just print it and confirm.
    print(f"[Newsletter] New subscriber: {email}")
    return jsonify({"ok": True, "message": "Subscribed! Thank you."})


# ── Entry point ───────────────────────────────────────────────
if __name__ == "__main__":
    print("\n  Tanova Kitchen – Flask server")
    print("  Open: http://localhost:5000\n")
    app.run(debug=True, port=5000)
