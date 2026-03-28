<?php
require('/var/www/html/config/config.inc.php');
require_once _PS_MODULE_DIR_ . 'chettoheadless/classes/ChettoTestimonial.php';

$rows = ChettoTestimonial::getAll();
echo 'Testimonials count: ' . count($rows) . PHP_EOL;
foreach ($rows as $r) {
    echo $r['id_chetto_testimonial'] . ' | ' . $r['name'] . ' | ' . $r['location'] . ' | ' . $r['rating'] . PHP_EOL;
}

echo PHP_EOL . 'Config:' . PHP_EOL;
echo 'Title: ' . Configuration::get('CHETTO_TESTIMONIALS_TITLE') . PHP_EOL;
echo 'Subtitle: ' . Configuration::get('CHETTO_TESTIMONIALS_SUBTITLE') . PHP_EOL;
echo 'Stat1: ' . Configuration::get('CHETTO_STAT_1_VALUE') . ' / ' . Configuration::get('CHETTO_STAT_1_LABEL') . PHP_EOL;
echo 'Stat2: ' . Configuration::get('CHETTO_STAT_2_VALUE') . ' / ' . Configuration::get('CHETTO_STAT_2_LABEL') . PHP_EOL;
echo 'Stat3: ' . Configuration::get('CHETTO_STAT_3_VALUE') . ' / ' . Configuration::get('CHETTO_STAT_3_LABEL') . PHP_EOL;
