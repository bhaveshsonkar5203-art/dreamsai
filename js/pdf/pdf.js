(function () {
  let PDF_TRACE_SEQ = 0;
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

  function drawLuxuryGoldDivider(pdf, x, y, width) {
    // Ultra-refined dual gold gradient effect line with center diamond detail
    pdf.setDrawColor(212, 175, 55); // Premium Champange Gold
    pdf.setLineWidth(1);
    pdf.line(x, y, x + width, y);
    
    pdf.setDrawColor(245, 230, 175);
    pdf.setLineWidth(0.4);
    pdf.line(x + 10, y + 1.5, x + width - 10, y + 1.5);
  }

  function drawPageBackground(pdf, pageWidth, pageHeight) {
    // Clean off-white canvas with luxury architectural border
    pdf.setFillColor(252, 252, 253);
    pdf.rect(0, 0, pageWidth, pageHeight, "F");

    // Outer subtle border
    pdf.setFillColor(255, 255, 255);
    pdf.setDrawColor(226, 232, 240);
    pdf.setLineWidth(0.75);
    pdf.roundedRect(16, 16, pageWidth - 32, pageHeight - 32, 8, 8, "FD");

    // Fine inner hairline border
    pdf.setDrawColor(241, 245, 249);
    pdf.setLineWidth(0.5);
    pdf.rect(22, 22, pageWidth - 44, pageHeight - 44, "S");
  }

  function drawCatalogueFrame(pdf, pageWidth, pageHeight, margin, pageNumber, totalPages, title) {
    drawPageBackground(pdf, pageWidth, pageHeight);

    // Luxury Header Panel
    const headerHeight = 72;
    pdf.setFillColor(15, 23, 42); // Midnight Obsidian Navy
    pdf.roundedRect(margin, margin, pageWidth - margin * 2, headerHeight, 8, 8, "F");
    
    // Gold Accent Bar under Header
    drawLuxuryGoldDivider(pdf, margin + 18, margin + headerHeight - 4, pageWidth - margin * 2 - 36);

    // Brand Name Badge
    pdf.setFillColor(212, 175, 55); // Luxury Champagne Gold
    pdf.roundedRect(margin + 18, margin + 14, 155, 18, 3, 3, "F");
    pdf.setTextColor(15, 23, 42);
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(8.5);
    pdf.text("ASCEND COMMUNICATION", margin + 26, margin + 26);

    // Page Title
    pdf.setTextColor(255, 255, 255);
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(17);
    pdf.text(title, margin + 18, margin + 50);

    // Date & Page Badge
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(9);
    pdf.setTextColor(203, 213, 225);
    pdf.text(formatDateLabel(), pageWidth - margin - 18, margin + 26, { align: "right" });
    
    pdf.setFont("helvetica", "bold");
    pdf.setTextColor(212, 175, 55);
    pdf.text(`Page ${pageNumber} of ${totalPages}`, pageWidth - margin - 18, margin + 48, { align: "right" });

    // Main Showcase Container Panel
    const panelX = margin + 8;
    const panelY = margin + headerHeight + 14;
    const panelWidth = pageWidth - (margin + 8) * 2;
    const panelHeight = pageHeight - panelY - margin - 40;

    pdf.setFillColor(255, 255, 255);
    pdf.setDrawColor(226, 232, 240);
    pdf.setLineWidth(0.8);
    pdf.roundedRect(panelX, panelY, panelWidth, panelHeight, 10, 10, "FD");

    // Top Sub-header inside panel
    pdf.setFillColor(248, 250, 252);
    pdf.roundedRect(panelX + 10, panelY + 10, panelWidth - 20, 24, 5, 5, "F");
    pdf.setTextColor(51, 65, 85);
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(8.5);
    pdf.text("EXECUTIVE PRESENTATION TRAY", panelX + 20, panelY + 25);

    // Image Container Box
    const imageX = panelX + 14;
    const imageY = panelY + 42;
    const imageWidth = panelWidth - 28;
    const imageHeight = panelHeight - 76;

    pdf.setFillColor(252, 252, 253);
    pdf.setDrawColor(241, 245, 249);
    pdf.setLineWidth(0.75);
    pdf.roundedRect(imageX, imageY, imageWidth, imageHeight, 6, 6, "FD");

    // Bottom Footer Bar inside Panel
    pdf.setFillColor(248, 250, 252);
    pdf.roundedRect(panelX + 10, panelY + panelHeight - 28, panelWidth - 20, 20, 5, 5, "F");
    pdf.setTextColor(100, 116, 139);
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(8);
    pdf.text("Ascend Communication Executive Client Selection | Confidential & Proprietary", panelX + 18, panelY + panelHeight - 15);

    // Document Footer
    drawFooter(pdf, pageWidth, pageHeight, margin);

    return { imageX, imageY, imageWidth, imageHeight };
  }

  function drawFooter(pdf, pageWidth, pageHeight, margin) {
    drawLuxuryGoldDivider(pdf, margin, pageHeight - margin - 10, pageWidth - margin * 2);
    pdf.setTextColor(100, 116, 139);
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(8);
    pdf.text("Prepared by Ascend Communication | Premium Portfolio Document", margin, pageHeight - margin + 5);
    pdf.setTextColor(15, 23, 42);
    pdf.setFont("helvetica", "bold");
    pdf.text("Ascend Communication", pageWidth - margin, pageHeight - margin + 5, { align: "right" });
  }

  async function drawCoverPage(pdf, pageWidth, pageHeight, margin, title, totalPages, firstBlob, itemCount) {
    drawPageBackground(pdf, pageWidth, pageHeight);

    // Executive Cover Header Banner
    pdf.setFillColor(15, 23, 42);
    pdf.roundedRect(margin, margin, pageWidth - margin * 2, 136, 10, 10, "F");
    drawLuxuryGoldDivider(pdf, margin + 20, margin + 110, pageWidth - margin * 2 - 40);

    pdf.setFillColor(212, 175, 55);
    pdf.roundedRect(margin + 20, margin + 16, 170, 20, 4, 4, "F");
    pdf.setTextColor(15, 23, 42);
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(9);
    pdf.text("ASCEND COMMUNICATION", margin + 28, margin + 30);

    pdf.setTextColor(255, 255, 255);
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(10);
    pdf.text("Executive Portfolio & Client Presentation", margin + 20, margin + 54);
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(26);
    pdf.text(title, margin + 20, margin + 84);
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(9);
    pdf.setTextColor(203, 213, 225);
    pdf.text(`Prepared on ${formatDateLabel()}  |  ${itemCount} items  |  ${totalPages} pages`, margin + 20, margin + 125);

    const frameX = margin + 16;
    const frameY = margin + 152;
    const frameWidth = pageWidth - margin * 2 - 32;
    const frameHeight = 350;

    pdf.setFillColor(255, 255, 255);
    pdf.setDrawColor(226, 232, 240);
    pdf.setLineWidth(0.8);
    pdf.roundedRect(frameX, frameY, frameWidth, frameHeight, 10, 10, "FD");

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

    pdf.setFillColor(248, 250, 252);
    pdf.roundedRect(margin + 16, pageHeight - 104, pageWidth - margin * 2 - 32, 56, 8, 8, "F");
    pdf.setTextColor(15, 23, 42);
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(10.5);
    pdf.text("Ascend Communication Portfolio Notes", margin + 30, pageHeight - 84);
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(8.5);
    pdf.setTextColor(71, 85, 105);
    pdf.text(
      "High-resolution catalog generated specifically for executive client sharing, digital review, and print distribution.",
      margin + 30,
      pageHeight - 68,
      { maxWidth: pageWidth - margin * 2 - 60 }
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

    const jsPdfApi = window.jspdf && window.jspdf.jsPDF;
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
    const margin = 24;

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
        pdf.roundedRect(pageWidth - margin - 75, pageHeight - margin - 32, 58, 16, 4, 4, "F");
        pdf.setFontSize(8);
        pdf.setFont("helvetica", "bold");
        pdf.setTextColor(212, 175, 55);
        pdf.text(badgeLabel, pageWidth - margin - 46, pageHeight - margin - 21, { align: "center" });
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

    const jsPdfApi = window.jspdf && window.jspdf.jsPDF;
    if (!jsPdfApi) throw new Error("PDF library not loaded");

    const pdf = new jsPdfApi({ orientation: "portrait", unit: "pt", format: "a4" });
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const margin = 24;

    await drawCoverPage(pdf, pageWidth, pageHeight, margin, title, totalPages, null, itemCount);

    return pdf.output("blob");
  }

  blobToDataUrl = wrapPdfFunctionIo("blobToDataUrl", blobToDataUrl);
  formatDateLabel = wrapPdfFunctionIo("formatDateLabel", formatDateLabel);
  drawLuxuryGoldDivider = wrapPdfFunctionIo("drawLuxuryGoldDivider", drawLuxuryGoldDivider);
  drawPageBackground = wrapPdfFunctionIo("drawPageBackground", drawPageBackground);
  drawCatalogueFrame = wrapPdfFunctionIo("drawCatalogueFrame", drawCatalogueFrame);
  drawFooter = wrapPdfFunctionIo("drawFooter", drawFooter);
  drawCoverPage = wrapPdfFunctionIo("drawCoverPage", drawCoverPage);
  buildPdfBlob = wrapPdfFunctionIo("buildPdfBlob", buildPdfBlob);
  buildCoverPdfBlob = wrapPdfFunctionIo("buildCoverPdfBlob", buildCoverPdfBlob);

  window.JewelleryPdf = {
    buildPdfBlob: buildPdfBlob,
    buildCoverPdfBlob: buildCoverPdfBlob
  };
})();


