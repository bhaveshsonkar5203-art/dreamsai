let PDF_TRACE_SEQ = 0;
let pdfLibCache = null;

async function getPdfLib() {
  if (pdfLibCache) {
    return pdfLibCache;
  }

  const [{ jsPDF: jsPDFCtor }] = await Promise.all([
    import('jspdf')
  ]);

  pdfLibCache = {
    jsPDF: jsPDFCtor
  };

  return pdfLibCache;
}

  function pdfTrace(step, payload) {
    PDF_TRACE_SEQ += 1;
    const id = String(PDF_TRACE_SEQ).padStart(3, "0");
    if (payload === undefined) {
      console.log(`[PDF TRACE ${id}] ${step}`);
      return;
    }
    console.log(`[PDF TRACE ${id}] ${step}`, payload);
  }

  function summarizePdfValue(value, depth = 0) {
    if (value == null) return value;
    if (depth > 2) return "[max-depth]";

    if (value instanceof Blob) {
      return { __type: "Blob", size: value.size, type: value.type };
    }

    if (Array.isArray(value)) {
      const head = value.slice(0, 8).map(v => summarizePdfValue(v, depth + 1));
      if (value.length > 8) {
        head.push(`...(+${value.length - 8} more)`);
      }
      return head;
    }

    if (typeof value === "function") {
      return `[Function ${value.name || "anonymous"}]`;
    }

    if (typeof value !== "object") {
      return value;
    }

    const out = {};
    Object.keys(value).slice(0, 20).forEach((key) => {
      out[key] = summarizePdfValue(value[key], depth + 1);
    });
    return out;
  }

  function wrapPdfFunctionIo(name, fn) {
    return function wrappedPdfFunctionIo(...args) {
      pdfTrace(`FN ${name}:input`, summarizePdfValue(args));
      try {
        const result = fn.apply(this, args);
        if (result && typeof result.then === "function") {
          return result.then((resolved) => {
            pdfTrace(`FN ${name}:output`, summarizePdfValue(resolved));
            return resolved;
          }).catch((err) => {
            pdfTrace(`FN ${name}:error`, { message: err?.message || String(err) });
            throw err;
          });
        }
        pdfTrace(`FN ${name}:output`, summarizePdfValue(result));
        return result;
      } catch (err) {
        pdfTrace(`FN ${name}:error`, { message: err?.message || String(err) });
        throw err;
      }
    };
  }

  async function blobToDataUrl(blob) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = () => reject(new Error("Unable to read file data"));
      reader.readAsDataURL(blob);
    });
  }

  function formatDateLabel() {
    return new Date().toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric"
    });
  }

  function drawGoldAccentLine(pdf, x, y, width) {
    // Sleek dual metallic accent line
    pdf.setDrawColor(212, 175, 55); // Rich Gold
    pdf.setLineWidth(1.2);
    pdf.line(x, y, x + width, y);
    pdf.setDrawColor(240, 218, 140);
    pdf.setLineWidth(0.5);
    pdf.line(x, y + 2, x + width, y + 2);
  }

  function drawPageTexture(pdf, pageWidth, pageHeight) {
    // Elegant neutral slate/canvas backdrop
    pdf.setFillColor(248, 249, 251);
    pdf.rect(0, 0, pageWidth, pageHeight, "F");

    // Clean outer frame shadow & border
    pdf.setFillColor(255, 255, 255);
    pdf.setDrawColor(226, 232, 240);
    pdf.setLineWidth(1);
    pdf.roundedRect(18, 18, pageWidth - 36, pageHeight - 36, 12, 12, "FD");

    // Subtle inner accent border
    pdf.setDrawColor(241, 245, 249);
    pdf.setLineWidth(0.8);
    pdf.roundedRect(24, 24, pageWidth - 48, pageHeight - 48, 8, 8, "S");
  }

  function drawCatalogueFrame(pdf, pageWidth, pageHeight, margin, pageNumber, totalPages, title) {
    drawPageTexture(pdf, pageWidth, pageHeight);

    // Header container with sleek navy gradient/dark backdrop
    const headerHeight = 68;
    pdf.setFillColor(15, 23, 42); // Deep Executive Navy (Slate-900)
    pdf.roundedRect(margin, margin, pageWidth - margin * 2, headerHeight, 10, 10, "F");
    
    // Header accent bar
    drawGoldAccentLine(pdf, margin + 20, margin + headerHeight - 6, pageWidth - margin * 2 - 40);

    // Brand Name Badge
    pdf.setFillColor(212, 175, 55); // Gold Accent
    pdf.roundedRect(margin + 20, margin + 12, 140, 18, 4, 4, "F");
    pdf.setTextColor(15, 23, 42);
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(8.5);
    pdf.text("ASCEND COMMUNICATION", margin + 27, margin + 24);

    // Page Title
    pdf.setTextColor(255, 255, 255);
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(18);
    pdf.text(title, margin + 20, margin + 48);

    // Date & Page details
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(9.5);
    pdf.setTextColor(203, 213, 225);
    pdf.text(formatDateLabel(), pageWidth - margin - 20, margin + 24, { align: "right" });
    pdf.setFont("helvetica", "bold");
    pdf.setTextColor(212, 175, 55);
    pdf.text(`Page ${pageNumber} of ${totalPages}`, pageWidth - margin - 20, margin + 46, { align: "right" });

    // Main Showcase Container Panel
    const panelX = margin + 10;
    const panelY = margin + headerHeight + 16;
    const panelWidth = pageWidth - (margin + 10) * 2;
    const panelHeight = pageHeight - panelY - margin - 44;

    pdf.setFillColor(255, 255, 255);
    pdf.setDrawColor(203, 213, 225);
    pdf.setLineWidth(1);
    pdf.roundedRect(panelX, panelY, panelWidth, panelHeight, 12, 12, "FD");

    // Top Sub-header inside panel
    pdf.setFillColor(241, 245, 249);
    pdf.roundedRect(panelX + 12, panelY + 12, panelWidth - 24, 26, 6, 6, "F");
    pdf.setTextColor(51, 65, 85);
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(9);
    pdf.text("CURATED PRESENTATION TRAY", panelX + 22, panelY + 28);

    // Image Container
    const imageX = panelX + 16;
    const imageY = panelY + 46;
    const imageWidth = panelWidth - 32;
    const imageHeight = panelHeight - 84;

    pdf.setFillColor(250, 250, 250);
    pdf.setDrawColor(241, 245, 249);
    pdf.setLineWidth(0.75);
    pdf.roundedRect(imageX, imageY, imageWidth, imageHeight, 8, 8, "FD");

    // Bottom Footer Bar in Panel
    pdf.setFillColor(248, 250, 252);
    pdf.roundedRect(panelX + 12, panelY + panelHeight - 32, panelWidth - 24, 22, 6, 6, "F");
    pdf.setTextColor(100, 116, 139);
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(8);
    pdf.text("Ascend Communication Executive Client Selection | Confidential & Proprietary", panelX + 20, panelY + panelHeight - 18);

    // Document Footer
    drawFooter(pdf, pageWidth, pageHeight, margin);

    return { imageX, imageY, imageWidth, imageHeight };
  }

  function drawFooter(pdf, pageWidth, pageHeight, margin) {
    drawGoldAccentLine(pdf, margin, pageHeight - margin - 12, pageWidth - margin * 2);
    pdf.setTextColor(100, 116, 139);
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(8.5);
    pdf.text("Prepared by Ascend Communication | Premium Portfolio Document", margin, pageHeight - margin + 4);
    pdf.setTextColor(15, 23, 42);
    pdf.setFont("helvetica", "bold");
    pdf.text("Ascend Communication", pageWidth - margin, pageHeight - margin + 4, { align: "right" });
  }

  async function drawCoverPage(pdf, pageWidth, pageHeight, margin, title, totalPages, firstBlob, itemCount) {
    drawPageTexture(pdf, pageWidth, pageHeight);

    // Executive Banner
    pdf.setFillColor(15, 23, 42);
    pdf.roundedRect(margin, margin, pageWidth - margin * 2, 130, 14, 14, "F");
    drawGoldAccentLine(pdf, margin + 20, margin + 104, pageWidth - margin * 2 - 40);

    pdf.setFillColor(212, 175, 55);
    pdf.roundedRect(margin + 20, margin + 16, 160, 20, 4, 4, "F");
    pdf.setTextColor(15, 23, 42);
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(9);
    pdf.text("ASCEND COMMUNICATION", margin + 28, margin + 30);

    pdf.setTextColor(255, 255, 255);
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(10.5);
    pdf.text("Executive Portfolio & Client Presentation", margin + 20, margin + 54);
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(28);
    pdf.text(title, margin + 20, margin + 84);
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(9.5);
    pdf.setTextColor(203, 213, 225);
    pdf.text(`Prepared on ${formatDateLabel()}  |  ${itemCount} items  |  ${totalPages} pages`, margin + 20, margin + 120);

    const frameX = margin + 20;
    const frameY = margin + 148;
    const frameWidth = pageWidth - margin * 2 - 40;
    const frameHeight = 350;

    pdf.setFillColor(255, 255, 255);
    pdf.setDrawColor(203, 213, 225);
    pdf.setLineWidth(1);
    pdf.roundedRect(frameX, frameY, frameWidth, frameHeight, 12, 12, "FD");

    if (firstBlob) {
      const imageDataUrl = await blobToDataUrl(firstBlob);
      const imageProps = pdf.getImageProperties(imageDataUrl);
      const scale = Math.min((frameWidth - 20) / imageProps.width, (frameHeight - 20) / imageProps.height);
      const renderWidth = imageProps.width * scale;
      const renderHeight = imageProps.height * scale;
      const imageX = frameX + (frameWidth - renderWidth) / 2;
      const imageY = frameY + (frameHeight - renderHeight) / 2;
      pdf.addImage(imageDataUrl, "PNG", imageX, imageY, renderWidth, renderHeight, undefined, "FAST");
    }

    pdf.setFillColor(241, 245, 249);
    pdf.roundedRect(margin + 20, pageHeight - 110, pageWidth - margin * 2 - 40, 60, 10, 10, "F");
    pdf.setTextColor(15, 23, 42);
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(11);
    pdf.text("Ascend Communication Portfolio Notes", margin + 36, pageHeight - 88);
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(9);
    pdf.setTextColor(71, 85, 105);
    pdf.text(
      "High-resolution catalog generated specifically for executive client sharing, digital review, and print distribution.",
      margin + 36,
      pageHeight - 70,
      { maxWidth: pageWidth - margin * 2 - 80 }
    );

    drawFooter(pdf, pageWidth, pageHeight, margin);
  }

  async function buildPdfBlob(options) {
    const pageBlobs = Array.isArray(options?.pageBlobs) ? options.pageBlobs : [];
    const items = Array.isArray(options?.items) ? options.items : [];
    const title = String(options?.title || "Ascend Communication Showcase");

    if (!pageBlobs.length) {
      throw new Error("Generate pages first");
    }

    const { jsPDF: jsPdfApi } = await getPdfLib();
    if (!jsPdfApi) {
      throw new Error("PDF library not loaded");
    }

    const pdf = new jsPdfApi({
      orientation: "portrait",
      unit: "pt",
      format: "a4"
    });

    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const margin = 26;

    const totalItems = items.length > 0 ? items.length : pageBlobs.length * 6;
    const totalPages = pageBlobs.length;
    pdfTrace("P02 buildPdfBlob:pageSetup", { pageWidth, pageHeight, totalItems, totalPages });

    const batchSize = 10;
    for (let i = 0; i < pageBlobs.length; i += batchSize) {
      const batch = pageBlobs.slice(i, i + batchSize);
      const imageDataUrls = await Promise.all(
        batch.map(blob => blobToDataUrl(blob))
      );

      imageDataUrls.forEach((imageDataUrl, j) => {
        const index = i + j;

        if (index > 0) pdf.addPage();
        const frame = drawCatalogueFrame(pdf, pageWidth, pageHeight, margin, index + 1, pageBlobs.length, title);
        const imageProps = pdf.getImageProperties(imageDataUrl);
        const scale = Math.min(frame.imageWidth / imageProps.width, frame.imageHeight / imageProps.height);
        const renderWidth = imageProps.width * scale;
        const renderHeight = imageProps.height * scale;
        const imageX = frame.imageX + (frame.imageWidth - renderWidth) / 2;
        const imageY = frame.imageY + (frame.imageHeight - renderHeight) / 2;

        pdf.addImage(
          imageDataUrl,
          "PNG",
          imageX,
          imageY,
          renderWidth,
          renderHeight,
          undefined,
          "FAST"
        );

        const badgeLabel = `${index + 1} / ${pageBlobs.length}`;
        pdf.setFillColor(15, 23, 42);
        pdf.roundedRect(pageWidth - margin - 80, pageHeight - margin - 34, 60, 18, 6, 6, "F");
        pdf.setFontSize(8);
        pdf.setFont("helvetica", "bold");
        pdf.setTextColor(212, 175, 55);
        pdf.text(badgeLabel, pageWidth - margin - 50, pageHeight - margin - 22, { align: "center" });
      });
    }

    const out = pdf.output("blob");
    pdfTrace("P05 buildPdfBlob:done", { outputSize: out.size, outputType: out.type });
    return out;
  }

  async function buildCoverPdfBlob(options) {
    const items = Array.isArray(options?.items) ? options.items : [];
    const title = String(options?.title || "Ascend Communication Catalogue");
    const totalPages = Number(options?.totalPages || 1);
    const itemCount = items.length || Number(options?.itemCount || 0);

    const { jsPDF: jsPdfApi } = await getPdfLib();
    if (!jsPdfApi) throw new Error("PDF library not loaded");

    const pdf = new jsPdfApi({ orientation: "portrait", unit: "pt", format: "a4" });
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const margin = 26;

    await drawCoverPage(pdf, pageWidth, pageHeight, margin, title, totalPages, null, itemCount);

    return pdf.output("blob");
  }

  blobToDataUrl = wrapPdfFunctionIo("blobToDataUrl", blobToDataUrl);
  formatDateLabel = wrapPdfFunctionIo("formatDateLabel", formatDateLabel);
  drawGoldAccentLine = wrapPdfFunctionIo("drawGoldAccentLine", drawGoldAccentLine);
  drawPageTexture = wrapPdfFunctionIo("drawPageTexture", drawPageTexture);
  drawCatalogueFrame = wrapPdfFunctionIo("drawCatalogueFrame", drawCatalogueFrame);
  drawFooter = wrapPdfFunctionIo("drawFooter", drawFooter);
  drawCoverPage = wrapPdfFunctionIo("drawCoverPage", drawCoverPage);
  buildPdfBlob = wrapPdfFunctionIo("buildPdfBlob", buildPdfBlob);
  buildCoverPdfBlob = wrapPdfFunctionIo("buildCoverPdfBlob", buildCoverPdfBlob);

  window.JewelleryPdf = {
    buildPdfBlob: buildPdfBlob,
    buildCoverPdfBlob: buildCoverPdfBlob
  };

