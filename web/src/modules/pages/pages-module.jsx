import React, { useEffect, useRef, useState } from 'react';
import { usePageState } from '../../state/pages';
import { clearDrawing, drawImage, generateImage } from '../../tools/drawing';
import { Dialog } from '../../components/dialog/dialog';
import { DrawingArea } from '../../components/drawing-area/drawing-area';
import { PagesDialog } from './pages-dialog';
import { PagesList } from './pages-list';
import './pages.scss';

export const PagesModule = () => {
  const canvasElement = useRef(null);
  const [showDialog, setShowDialog] = useState(false);
  const [currentPage, setCurrentPage] = useState(null);
  const [[pages, error], [fetchPages, savePage]] = usePageState();

  useEffect(() => {
    fetchPages();
  }, []);

  const handleNewPage = () => {
    setShowDialog(true);
  };

  const handleDialogClose = async (title) => {
    setShowDialog(false);
    saveCurrentPage();
    // Dialog return new Page Title
    if (title) {
      const page = await savePage({title});
      setCurrentPage(page);
      if (canvasElement.current)
        clearDrawing(canvasElement.current);
    }
  };

  const handleLoadPage = (page) => {
    // Save the current page
    saveCurrentPage();
    setCurrentPage(page);

    // Clear pages and select new index
    clearDrawing(canvasElement.current);
    // Loads image data into canvas
    drawImage(canvasElement.current, page.imageData);
  };

  const saveCurrentPage = () => {
    if (currentPage) {
      currentPage.imageData = generateImage(canvasElement.current);
      savePage(currentPage);
    }
  };

  return (
    <section className="pages">
      <Dialog show={showDialog}>
        <PagesDialog pageCount={pages.length}
                     onClose={handleDialogClose}/>
      </Dialog>
      <section className="pages__left-panel">
        <span>{error}</span>
        <section className="pages__page-controls">
          <button onClick={handleNewPage}>New Page
          </button>
        </section>
        <PagesList pages={pages}
                   selectedPage={currentPage}
                   onPageSelected={handleLoadPage}/>
      </section>
      {
        pages.length > 0 ?
          <DrawingArea ref={canvasElement}
                       className="pages__canvas"/> :
          <section className="pages__empty"><h1>Create a new page and start drawing</h1></section>
      }
    </section>
  );
};
