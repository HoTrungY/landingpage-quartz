import AosModule from "./module/AosModule.js";
import SwiperModule from "./module/SwiperModule.js";
import Select2Module from "./module/Select2Module.js";
import TabModule from "./module/TabModule.js";
import MenuModule from "./module/MenuModule.js";
import CommonModule from "./module/CommonModule.js";
import CounterModule from "./module/CounterModule.js";
import MatchHeightModule from "./module/MatchHeightModule.js";
import ModalModule from "./module/ModalModule.js";
import gallery from "./module/GalleryModule.js";
import FileModule from "./module/FileModule.js";
import PasswordModule from "./module/PasswordModule.js";
import SideModule from "./module/SideModule.js";
import HandlePopup from "./module/HandlePopup.js";
import ScrollSection from "./module/ScrollSection.js";
import HandleDisplayProd from "./module/HandleDisplayProd.js";
import DropDownModule from "./module/DropDownModule.js";
import VisualizerModule from "./module/VisualizerModule.js";

window.addEventListener("DOMContentLoaded", () => {
  // Animation
  AosModule();
  // Tab
  TabModule();
  // Select
  Select2Module();
  // Component
  SwiperModule();
  MenuModule();
  gallery();
  FileModule();
  PasswordModule();
  SideModule();
  CommonModule();
  CounterModule();
  MatchHeightModule();
  // ModalModule();
  HandlePopup();
  ScrollSection();
  HandleDisplayProd();
  DropDownModule();
  VisualizerModule();
});
