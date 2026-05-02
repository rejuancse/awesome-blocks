#!/bin/bash

# Post Block Verification Script

echo "🔍 Checking Awesome Blocks Plugin..."
echo ""

PLUGIN_DIR="/Users/rejuan/Desktop/wordpress-docker-files/techbuild/wordpress/wp-content/plugins/awesome-blocks"

# Check if plugin directory exists
if [ ! -d "$PLUGIN_DIR" ]; then
    echo "❌ Plugin directory not found!"
    exit 1
fi

echo "✅ Plugin directory found"

# Check build directory
if [ ! -d "$PLUGIN_DIR/build/post-block" ]; then
    echo "❌ Build directory not found! Run: npm run build"
    exit 1
fi

echo "✅ Build directory exists"

# Check required files
echo ""
echo "📁 Checking required files..."

files=(
    "build/post-block/block.json"
    "build/post-block/index.js"
    "build/post-block/index.asset.php"
    "build/post-block/index.css"
    "build/post-block/style-index.css"
)

for file in "${files[@]}"; do
    if [ -f "$PLUGIN_DIR/$file" ]; then
        echo "✅ $file"
    else
        echo "❌ $file - MISSING!"
    fi
done

echo ""

# Check block.json for category
echo "🏷️  Checking block category..."

if grep -q '"category": "awesome-block"' "$PLUGIN_DIR/build/post-block/block.json"; then
    echo "✅ Block category is set to 'awesome-block'"
else
    echo "❌ Block category NOT found!"
fi

# Check main plugin file
echo ""
echo "📄 Checking main plugin file..."

if [ -f "$PLUGIN_DIR/awesome-blocks.php" ]; then
    echo "✅ Main plugin file exists"

    if grep -q "Plugin Name: Awesome Blocks" "$PLUGIN_DIR/awesome-blocks.php"; then
        echo "✅ Plugin header is correct"
    fi
else
    echo "❌ Main plugin file not found!"
fi

# Check render callback
echo ""
echo "🔧 Checking render callback..."

if [ -f "$PLUGIN_DIR/includes/render-post-block.php" ]; then
    echo "✅ Render callback file exists"

    if grep -q "function ab_render_post_block" "$PLUGIN_DIR/includes/render-post-block.php"; then
        echo "✅ Render function defined"
    fi
else
    echo "❌ Render callback file not found!"
fi

# Check block registration
echo ""
echo "📝 Checking block registration..."

if [ -f "$PLUGIN_DIR/includes/register-blocks.php" ]; then
    echo "✅ Block registration file exists"

    if grep -q "ab_register_block_category" "$PLUGIN_DIR/includes/register-blocks.php"; then
        echo "✅ Block category registration function exists"
    fi

    if grep -q "register_block_type" "$PLUGIN_DIR/includes/register-blocks.php"; then
        echo "✅ Block registration function exists"
    fi
else
    echo "❌ Block registration file not found!"
fi

echo ""
echo "🎯 Summary:"
echo "If all checks are ✅, then:"
echo "1. Go to WordPress Admin → Plugins"
echo "2. Deactivate 'Awesome Blocks' (if active)"
echo "3. Clear browser cache (Ctrl+Shift+R / Cmd+Shift+R)"
echo "4. Activate 'Awesome Blocks'"
echo "5. Open any page/post editor"
echo "6. Click + (plus icon)"
echo "7. Search for 'Post Block' or look in 'Awesome Blocks' category"
echo ""
