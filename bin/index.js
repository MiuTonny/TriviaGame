#!/usr/bin/env node

import { showMainMenu } from '../src/lib/gameLogic.js';
import { gameState } from '../src/lib/state.js';

showMainMenu(gameState);
