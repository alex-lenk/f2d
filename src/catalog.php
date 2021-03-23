<?
// определение мобильного устройства
// Подключение и инициализация класса
require_once 'php/Mobile_Detect.php';
$detect = new Mobile_Detect;

if ($detect->isMobile() && !$detect->isTablet()) {
  include("catalog-mob.html");
} else {
  include("catalog-desk.html");
}
