class InteractiveImageMap {
    constructor(container) {
        if (!container) throw new Error("Container element is required.");

        this.container = container;
        this.container.style.position = "relative";
        this.container.style.display = "inline-block";

        this.points = new Map(); // Store points with IDs
        this.image = container.querySelector("img");

        if (!this.image) throw new Error("Container must contain an <img> element.");

        this.image.style.maxWidth = "100%";
        this.image.style.height = "auto";

        this.image.addEventListener("click", this._onImageClick.bind(this));
    }

    /**
     * Add a point to the image with custom tooltip content and classes.
     * @param {Object} options - Options for the point.
     * @param {string} options.id - Unique identifier for the point.
     * @param {number} options.x - X-coordinate as a percentage of the image width.
     * @param {number} options.y - Y-coordinate as a percentage of the image height.
     * @param {string} [options.pointClass] - CSS class for the point element.
     * @param {string} [options.tooltipClass] - CSS class for the tooltip element.
     * @param {string|HTMLElement} [options.tooltipContent] - Content for the tooltip.
     * @param {Function} [options.onClick] - Callback for click events on the point.
     */
    addPoint({ id, x, y, pointClass = "default-point", tooltipClass = "default-tooltip", tooltipContent = "", onClick = null }) {
        if (!id || this.points.has(id)) {
            throw new Error("Point ID is required and must be unique.");
        }

        // Create point element
        const point = document.createElement("div");
        point.style.position = "absolute";
        point.style.left = `${x}%`;
        point.style.top = `${y}%`;
        point.style.transform = "translate(-50%, -50%)";
        point.classList.add(pointClass);

        // Create tooltip element
        const tooltip = document.createElement("div");
        tooltip.style.position = "absolute";
        tooltip.style.visibility = "hidden";
        tooltip.style.pointerEvents = "none";
        tooltip.classList.add(tooltipClass);

        if (typeof tooltipContent === "string") {
            tooltip.innerHTML = tooltipContent;
        } else if (tooltipContent instanceof HTMLElement) {
            tooltip.appendChild(tooltipContent);
        }

        // Show tooltip on hover
        point.addEventListener("mouseenter", () => {
            const containerRect = this.container.getBoundingClientRect();
            const pointRect = point.getBoundingClientRect();
            const tooltipRect = tooltip.getBoundingClientRect();

            let left = pointRect.left - containerRect.left + pointRect.width / 2;
            let top = pointRect.top - containerRect.top - tooltipRect.height - 10;

            // Adjust position to keep tooltip within container bounds
            if (left + tooltipRect.width > containerRect.width) {
                left = containerRect.width - tooltipRect.width - 10;
            }
            if (left < 0) {
                left = 10;
            }
            if (top < 0) {
                top = pointRect.top - containerRect.top + pointRect.height + 10;
            }

            tooltip.style.left = `${left}px`;
            tooltip.style.top = `${top}px`;
            tooltip.style.visibility = "visible";
        });

        point.addEventListener("mouseleave", () => {
            tooltip.style.visibility = "hidden";
        });

        // Handle click event
        if (onClick) {
            point.addEventListener("click", onClick);
        }

        // Append point and tooltip to the container
        this.container.appendChild(point);
        this.container.appendChild(tooltip);

        // Store the point data
        this.points.set(id, { x, y, point, tooltip });
    }

    /**
     * Remove a point by its ID.
     * @param {string} id - ID of the point to remove.
     */
    removePoint(id) {
        const pointData = this.points.get(id);
        if (!pointData) return;

        // Remove elements from DOM
        pointData.point.remove();
        pointData.tooltip.remove();

        // Remove from points map
        this.points.delete(id);
    }

    /**
     * Clear all points from the image.
     */
    clearPoints() {
        this.points.forEach(({ point, tooltip }) => {
            point.remove();
            tooltip.remove();
        });
        this.points.clear();
    }

    /**
     * Enable point selection mode to retrieve coordinates.
     * @param {Function} callback - Callback that receives the coordinates of the clicked point.
     */
    enableSelectionMode(callback) {
        this.selectionCallback = callback;
        this.container.style.cursor = "crosshair";
    }

    /**
     * Disable point selection mode.
     */
    disableSelectionMode() {
        this.selectionCallback = null;
        this.container.style.cursor = "default";
    }

    /**
     * Handle image click for selection mode.
     * @param {MouseEvent} event
     */
    _onImageClick(event) {
        if (!this.selectionCallback) return;

        const rect = this.image.getBoundingClientRect();
        const x = ((event.clientX - rect.left) / rect.width) * 100;
        const y = ((event.clientY - rect.top) / rect.height) * 100;

        this.selectionCallback({ x: x.toFixed(2), y: y.toFixed(2) });
    }
}

