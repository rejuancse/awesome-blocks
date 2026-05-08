# WordPress Coding Standards - Render Callback Refactoring

## সমস্যা এবং সমাধান

### আগের সমস্যা:
1. `composer.json` এ `"files"` autoloading ব্যবহার করা হতো যা WordPress coding standards অনুযায়ী সঠিক নয়
2. Global functions ব্যবহার করা হতো যা naming collision এর সম্ভাবনা তৈরি করে
3. Namespace এবং class structure মেনে চলা হতো না

### সমাধান (WordPress Coding Standards অনুযায়ী):

#### 1. **দুটি নতুন Class তৈরি করা হয়েছে:**

**`includes/Post_Block.php`:**
- Namespace: `Awesome_Block\Post_Block`
- Method: `Post_Block::render( $attributes )`
- Post block render করে

**`includes/Woo_Product_List.php`:**
- Namespace: `Awesome_Block\Woo_Product_List`
- Method: `Woo_Product_List::render( $attributes )`
- WooCommerce products render করে

#### 2. **Register_Blocks.php আপডেট:**

```php
// আগে:
'render_callback' => 'ab_render_post_block'

// এখন:
'render_callback' => array( __NAMESPACE__ . '\\Post_Block', 'render' )
```

#### 3. **Composer Autoload সঠিকভাবে কনফিগার করা:**

```json
"autoload": {
    "psr-4": {
        "Awesome_Block\\": "includes/"
    }
}
```

## সুবিধা:

✅ **Namespace ব্যবহার:** Function naming collision এর সম্ভাবনা নেই
✅ **PSR-4 Autoloading:** WordPress coding standards মেনে চলছে
✅ **Static Methods:** Direct instantiation এর প্রয়োজন নেই
✅ **Better Testability:** PHPUnit tests সহজে লেখা যায়
✅ **Maintainability:** Code আরো organized এবং maintainable

## File Structure:

```
awesome-blocks/
├── includes/
│   ├── Post_Block.php          ← নতুন
│   ├── Woo_Product_List.php    ← নতুন
│   └── Register_Blocks.php      ← আপডেট করা হয়েছে
├── src/
│   ├── post-block/
│   │   └── block.json
│   └── woo-product-list/
│       └── block.json
└── composer.json               ← autoload section পরিষ্কার করা হয়েছে
```

## WordPress Coding Standards Compliance:

✅ সঠিক Namespace ব্যবহার
✅ PSR-4 autoloading মেনে চলা
✅ Class-based structure
✅ সঠিক naming convention (PascalCase এবং snake_case)
✅ Sanitization এবং escaping মেনে চলা
✅ সঠিক documentation standards

## Testing:

PHPUnit tests সফলভাবে পাস হচ্ছে:
```bash
vendor/bin/phpunit tests/php/SampleTest.php
# OK (7 tests, 19 assertions)
```

## পরবর্তী ধাপ:

ব্লকগুলো frontend এ সঠিকভাবে render হবে কারণ:
1. Classes autoloading মাধ্যমে load হবে
2. Register_Blocks.php তে সঠিক callback দেওয়া আছে
3. WordPress `register_block_type_from_metadata()` function সঠিকভাবে কাজ করবে
