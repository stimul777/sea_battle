import '@/assets/css/index.css';
import '@/app/models/socket';
import '@/app/view/index_view';
import { onPier } from '@/app/view/pier/pier_view';
onPier();
import { onViewPlayer } from '@/app/view/audioPlayer_view';
onViewPlayer();
import '@/app/view/grid/grid_view';
import '@/app/controllers/gridListener_control';
import { soundListener } from '@/app/controllers/soundListener_control';
soundListener();

// import { toast } from '@/app/view/toast_view';
