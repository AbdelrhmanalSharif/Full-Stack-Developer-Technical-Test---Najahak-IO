import { Request, Response } from "express";
import { prisma } from "../lib/prisma";

export async function getRequests(_req: Request, res: Response) {
  try {
    const requests = await prisma.clientRequest.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    res.json(requests);
  } catch (error) {
    console.error("Error fetching requests:", error);

    res.status(500).json({
      message: "Failed to fetch client requests",
    });
  }
}

export async function createRequest(req: Request, res: Response) {
  try {
    const { clientName, title, description } = req.body;

    if (!clientName || !title) {
      return res.status(400).json({
        message: "clientName and title are required",
      });
    }

    const request = await prisma.clientRequest.create({
      data: {
        clientName,
        title,
        description,
      },
    });

    res.status(201).json(request);
  } catch (error) {
    console.error("Error creating request:", error);

    res.status(500).json({
      message: "Failed to create client request",
    });
  }
}
export async function updateRequestStatus(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    const { status } = req.body;

    if (Number.isNaN(id)) {
      return res.status(400).json({
        message: "Invalid request ID",
      });
    }

    const allowedStatuses = ["New", "In Progress", "Done"];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        message: "Invalid status",
      });
    }

    const existingRequest = await prisma.clientRequest.findUnique({
      where: {
        id,
      },
    });

    if (!existingRequest) {
      return res.status(404).json({
        message: "Client request not found",
      });
    }

    const request = await prisma.clientRequest.update({
      where: {
        id,
      },
      data: {
        status,
      },
    });

    res.json(request);
  } catch (error) {
    console.error("Error updating request status:", error);

    res.status(500).json({
      message: "Failed to update request status",
    });
  }
}
